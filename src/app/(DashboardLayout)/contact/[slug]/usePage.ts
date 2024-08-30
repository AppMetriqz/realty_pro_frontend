import { apiContacts, apiPaymentPlans, apiPayments, apiSales } from '@/api';
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
import { formatCurrency } from '@/common/utils/numericHelpers';

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
  isResale: boolean;
  onClickCreateResale: (currentPaymentPlan: GetContactPaymentPlanDto) => void;
  onSubmitPaymentPlan: SubmitHandler<CreateUpdatePaymentPlanType>;
  setClientDescription: Dispatch<SetStateAction<string>>;
  onClickMoveToFinancing: ({ sale_id }: { sale_id: number }) => Promise<void>;
} & UseContactCreateUpdateProps;

const useContactProfilePage = (): UseContactProfilePageProps => {
  const { slug } = useParams();
  const [currentTabValue, setCurrentTabValue] = useState(0);
  const [contactDescription, setContactDescription] = useState('');
  const [openCreateEditContact, setOpenCreateEditContact] = useState(false);
  const [openAddSpouse, setOpenAddSpouse] = useState(false);
  const [openCreatePaymentPlanModal, setOpenCreatePaymentPlanModal] =
    useState(false);
  const [isResale, setIsResale] = useState(false);
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
  const createResale = apiPaymentPlans.useCreate();

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
  const financeSale = apiSales.useUpdate();

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
    setIsResale(false);
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
        payment_made_at: data.payment_made_at,
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

  const onClickCreateResale = (
    currentPaymentPlan: GetContactPaymentPlanDto
  ) => {
    const {
      separation_amount,
      separation_rate,
      total_amount,
      sale_id,
      payment_plan_numbers,
    } = currentPaymentPlan;
    if (total_amount)
      paymentPlanHookForm.setValue(
        'total_amount',
        formatCurrency(parseFloat(total_amount))
      );
    if (separation_amount)
      paymentPlanHookForm.setValue(
        'separation_amount',
        formatCurrency(parseFloat(separation_amount))
      );
    if (payment_plan_numbers)
      paymentPlanHookForm.setValue(
        'payment_plan_numbers',
        payment_plan_numbers
      );
    if (sale_id) paymentPlanHookForm.setValue('sale_id', sale_id);
    paymentPlanHookForm.setValue('is_resale', true);
    if (separation_rate)
      paymentPlanHookForm.setValue('separation_rate', separation_rate * 100);
    setIsResale(true);
    setOpenCreatePaymentPlanModal(true);
  };

  const onSubmitPaymentPlan: SubmitHandler<
    CreateUpdatePaymentPlanType
  > = async (data) => {
    try {
      const sale = await createResale.mutateAsync({
        sale_id: data.sale_id,
        separation_amount: parseFloat(
          data.separation_amount
            ? data.separation_amount.replaceAll(/[$,]/gi, '')
            : '0'
        ),
        separation_date: data.separation_date,
        payment_plan_numbers: data.payment_plan_numbers,
        separation_rate: data.separation_rate / 100,
        is_resale: isResale,
        total_amount:
          data.is_resale && data.total_amount
            ? parseFloat(data.total_amount.replaceAll(/[$,]/gi, ''))
            : undefined,
        client_id:
          data.is_resale && data.client_id
            ? parseInt(data.client_id)
            : undefined,
      });
      if (!!sale) {
        toast.success(`Reventa creada satisfactoriamente.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        paymentPlanHookForm.reset();
        setOpenCreatePaymentPlanModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onClickMoveToFinancing = async ({ sale_id }: { sale_id: number }) => {
    try {
      const sale = await financeSale.mutateAsync({
        sale_id,
        stage: 'financed',
      });
      if (!!sale) {
        toast.success(`Financiamiento creado.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
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
    isResale,
    onClickCreateResale,
    onSubmitPaymentPlan,
    setClientDescription,
    onClickMoveToFinancing,
  };
};

export default useContactProfilePage;
