import { apiContacts } from '@/api';
import { GetContactDto } from '@/common/dto';
import { useYupValidationResolver } from '@/common/utils/formHook';
import { UseQueryResult } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  contactDefaultValues,
  ContactFormInput,
  createContactValidationSchema,
} from './core';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ExceptionCatchResponse } from '@/common/exceptions';

export type UseContactPageProps = {
  openCreateEditContact: boolean;
  setOpenCreateEditContact: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
  allContacts: UseQueryResult<{ rows: GetContactDto[]; count: number }, Error>;
  changePageSize: (size: number) => void;
  onCloseCreateEditContact: () => void;
  contactHookForm: UseFormReturn<ContactFormInput, any, undefined>;
  onSubmit: SubmitHandler<ContactFormInput>;
  autocompleteContacts: UseQueryResult<
    { rows: GetContactDto[]; count: number },
    Error
  >;
  setContactDescription: Dispatch<SetStateAction<string>>;
  contactDescription: string;
};

export default function useContactPage(): UseContactPageProps {
  const [openCreateEditContact, setOpenCreateEditContact] = useState(false);
  const [page, setPage] = useState(0);
  const [contactDescription, setContactDescription] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const resolverCreateUpdateContact = useYupValidationResolver(
    createContactValidationSchema
  );

  const contactHookForm = useForm<ContactFormInput>({
    resolver: resolverCreateUpdateContact,
    defaultValues: contactDefaultValues,
  });

  const changePageSize = (size: number) => {
    setRowsPerPage(size);
  };

  const autocompleteContacts = apiContacts.useFindAllAutocomplete({
    description: contactDescription,
  });
  const allContacts = apiContacts.useFindAll({
    pageIndex: page,
    pageSize: rowsPerPage,
    sortOrder: 'DESC',
    sortBy: 'created_at',
  });
  const cretateContact = apiContacts.useCreate();

  const onCloseCreateEditContact = () => {
    setOpenCreateEditContact(false);
    contactHookForm.reset();
  };

  const onSubmit: SubmitHandler<ContactFormInput> = async (data) => {
    try {
      const contact = await cretateContact.mutateAsync(data);
      if (!!contact) {
        toast.success(`Contacto: ${data.first_name} creado.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        contactHookForm.reset();
        setOpenCreateEditContact(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  return {
    openCreateEditContact,
    setOpenCreateEditContact,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    changePageSize,
    allContacts,
    onCloseCreateEditContact,
    contactHookForm,
    onSubmit,
    autocompleteContacts,
    setContactDescription,
    contactDescription,
  };
}
