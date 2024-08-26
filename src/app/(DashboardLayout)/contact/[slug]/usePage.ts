import { apiContacts } from '@/api';
import { GetContactDto, GetContactPaymentPlanDto } from '@/common/dto';
import { UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { ContactFormInput } from '../core';
import { useYupValidationResolver } from '@/common/utils/formHook';
import { contactDefaultValues, updateContactValidationSchema } from './core';
import { ExceptionCatchResponse } from '@/common/exceptions';
import { toast } from 'react-toastify';

export type UseContactCreateUpdateProps = {
  contactHookForm: UseFormReturn<ContactFormInput, any, undefined>;
  onSubmit: SubmitHandler<ContactFormInput>;
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
} & UseContactCreateUpdateProps;

const useContactProfilePage = (): UseContactProfilePageProps => {
  const { slug } = useParams();
  const [currentTabValue, setCurrentTabValue] = useState(0);
  const [contactDescription, setContactDescription] = useState('');
  const [openCreateEditContact, setOpenCreateEditContact] = useState(false);
  const resolverCreateUpdateContact = useYupValidationResolver(
    updateContactValidationSchema
  );

  const contactHookForm = useForm<ContactFormInput>({
    resolver: resolverCreateUpdateContact,
    defaultValues: contactDefaultValues,
  });

  const findContact = apiContacts.useFindOne(slug);
  const findContactPaymentPlans = apiContacts.useFindPaymentPlans(slug, {
    status: 'active',
  });

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTabValue(newValue);
  };

  const autocompleteContacts = apiContacts.useFindAllAutocomplete({
    description: contactDescription,
  });

  const updateContact = apiContacts.useUpdate();

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
  };
};

export default useContactProfilePage;
