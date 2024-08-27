import { apiContacts, apiPayments } from '@/api';
import { GetContactDto, GetContactPaymentPlanDto } from '@/common/dto';
import { UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { ContactFormInput } from '../core';
import { useYupValidationResolver } from '@/common/utils/formHook';
import {
  addSpouseContactValidationSchema,
  contactDefaultValues,
  contactSpouseDefaultValues,
  ContactSpouseFormInput,
  createPaymentDefaultValues,
  createPaymentPlanDefaultValues,
  createPaymentPlanValidationSchema,
  createPaymentValidationSchema,
  CreateUpdatePaymentType,
  updateContactValidationSchema,
} from './core';
import { ExceptionCatchResponse } from '@/common/exceptions';
import { toast } from 'react-toastify';
import { CreateUpdatePaymentPlanType } from '../../dashboard/core';

export type UseContactCreateUpdateProps = {
  contactHookForm: UseFormReturn<ContactFormInput, any, undefined>;
  onSubmit: SubmitHandler<ContactFormInput>;
  autocompleteContacts: UseQueryResult<GetContactDto[], Error>;
  setContactDescription: Dispatch<SetStateAction<string>>;
};

export type UseContactAddSpouse = {
  contactSpouseHookForm: UseFormReturn<ContactSpouseFormInput, any, undefined>;
  onSubmitAddSpouse: SubmitHandler<ContactSpouseFormInput>;
  autocompleteContacts: UseQueryResult<GetContactDto[], Error>;
  setContactDescription: Dispatch<SetStateAction<string>>;
};

export type UseContactProfilePageProps = {
  currentTabValue: number;
  openCreateEditContact: boolean;
  setOpenCreateEditContact: Dispatch<SetStateAction<boolean>>;
  handleChangeTab: (_: React.SyntheticEvent, newValue: number) => void;
  findContact: UseQueryResult<GetContactDto, Error>;
  onCloseCreateEditContact: () => void;
  findContactPaymentPlans: UseQueryResult<GetContactPaymentPlanDto[], Error>;
  findFinishedContactPaymentPlans: UseQueryResult<
    GetContactPaymentPlanDto[],
    Error
  >;
  openAddSpouse: boolean;
  setOpenAddSpouse: Dispatch<SetStateAction<boolean>>;
  onCloseAddSpouse: () => void;
  contactSpouseHookForm: UseFormReturn<ContactSpouseFormInput, any, undefined>;
  onSubmitAddSpouse: SubmitHandler<ContactSpouseFormInput>;
  openCreatePaymentModal: boolean;
  openCreatePaymentPlanModal: boolean;
  onCloseCreatePaymentPlanModal: () => void;
  onCloseCreatePaymentModal: () => void;
  paymentHookForm: UseFormReturn<CreateUpdatePaymentType, any, undefined>;
  paymentPlanHookForm: UseFormReturn<
    CreateUpdatePaymentPlanType,
    any,
    undefined
  >;
  clientAutocompleteContacts: UseQueryResult<GetContactDto[], Error>;
  onClickCreatePayment: (paymentPlanId: number) => void;
  onSubmitPayment: SubmitHandler<CreateUpdatePaymentType>;
} & UseContactCreateUpdateProps;

const useContactProfilePage = (): UseContactProfilePageProps => {
  const { slug } = useParams();
  const [currentTabValue, setCurrentTabValue] = useState(0);
  const [contactDescription, setContactDescription] = useState('');
  const [openCreateEditContact, setOpenCreateEditContact] = useState(false);
  const [openAddSpouse, setOpenAddSpouse] = useState(false);
  const [openCreatePaymentPlanModal, setOpenCreatePaymentPlanModal] =
    useState(false);
  const [openCreatePaymentModal, setOpenCreatePaymentModal] = useState(false);
  const [clientDescription, setClientDescription] = useState('');
  const resolveSpouseContact = useYupValidationResolver(
    addSpouseContactValidationSchema
  );
  const resolverCreateUpdateContact = useYupValidationResolver(
    updateContactValidationSchema
  );
  const paymentPlanResolver = useYupValidationResolver(
    createPaymentPlanValidationSchema
  );
  const paymentResolver = useYupValidationResolver(
    createPaymentValidationSchema
  );

  const contactHookForm = useForm<ContactFormInput>({
    resolver: resolverCreateUpdateContact,
    defaultValues: contactDefaultValues,
  });
  const contactSpouseHookForm = useForm<ContactSpouseFormInput>({
    resolver: resolveSpouseContact,
    defaultValues: contactSpouseDefaultValues,
  });
  const paymentPlanHookForm = useForm<CreateUpdatePaymentPlanType>({
    resolver: paymentPlanResolver,
    defaultValues: createPaymentPlanDefaultValues,
  });
  const paymentHookForm = useForm<CreateUpdatePaymentType>({
    resolver: paymentResolver,
    defaultValues: createPaymentDefaultValues,
  });

  const findContact = apiContacts.useFindOne(slug);
  const findContactPaymentPlans = apiContacts.useFindPaymentPlans(slug, {
    status: 'sales',
  });
  const findFinishedContactPaymentPlans = apiContacts.useFindPaymentPlans(
    slug,
    {
      status: 'finished',
    }
  );
  const clientAutocompleteContacts = apiContacts.useFindAllAutocomplete({
    description: clientDescription,
  });

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTabValue(newValue);
  };

  const autocompleteContacts = apiContacts.useFindAllAutocomplete({
    description: contactDescription,
  });

  const updateContact = apiContacts.useUpdate();
  const addSpouseContact = apiContacts.useAddSpouse();
  const createPayment = apiPayments.useCreate();

  const onSubmit: SubmitHandler<ContactFormInput> = async (data) => {
    try {
      const contact = await updateContact.mutateAsync({
        ...data,
        contact_id: slug,
        notes: data.notes,
      });
      if (!!contact) {
        toast.success(`Contacto: ${data.first_name} actualizado.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setOpenCreateEditContact(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onCloseCreateEditContact = () => {
    setOpenCreateEditContact(false);
  };

  const onCloseAddSpouse = () => {
    setOpenAddSpouse(false);
    contactSpouseHookForm.reset();
  };

  const onSubmitAddSpouse: SubmitHandler<ContactSpouseFormInput> = async (
    data
  ) => {
    try {
      const contact = await addSpouseContact.mutateAsync({
        contact_id: slug,
        spouse_id: data.spouse_id,
      });
      if (!!contact) {
        toast.success(`Conyuge agregado.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setOpenAddSpouse(false);
        contactSpouseHookForm.reset();
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onCloseCreatePaymentPlanModal = () => {
    setOpenCreatePaymentPlanModal(false);
    paymentPlanHookForm.reset();
  };

  const onCloseCreatePaymentModal = () => {
    setOpenCreatePaymentModal(false);
    paymentHookForm.reset();
  };

  const onClickCreatePayment = (paymentPlanId: number) => {
    paymentHookForm.setValue('payment_plan_id', paymentPlanId);
    setOpenCreatePaymentModal(true);
  };

  const onSubmitPayment: SubmitHandler<CreateUpdatePaymentType> = async (
    data
  ) => {
    try {
      const payment = await createPayment.mutateAsync({
        payment_plan_id: data.payment_plan_id,
        amount: parseFloat(data.amount.replaceAll(/[$,]/gi, '')),
        notes: data.notes,
      });
      if (!!payment) {
        toast.success(`Pago creado.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setOpenCreatePaymentModal(false);
        paymentHookForm.reset();
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  return {
    currentTabValue,
    handleChangeTab,
    openCreateEditContact,
    findContact,
    autocompleteContacts,
    setContactDescription,
    contactHookForm,
    onSubmit,
    onCloseCreateEditContact,
    setOpenCreateEditContact,
    findContactPaymentPlans,
    findFinishedContactPaymentPlans,
    openAddSpouse,
    setOpenAddSpouse,
    onCloseAddSpouse,
    onSubmitAddSpouse,
    contactSpouseHookForm,
    openCreatePaymentModal,
    openCreatePaymentPlanModal,
    onCloseCreatePaymentPlanModal,
    paymentPlanHookForm,
    clientAutocompleteContacts,
    onCloseCreatePaymentModal,
    paymentHookForm,
    onClickCreatePayment,
    onSubmitPayment,
  };
};

export default useContactProfilePage;
