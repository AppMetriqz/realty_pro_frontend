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
import _ from 'lodash';
import { ContactType } from '@/common/constants';
import { DiffContactTypes } from '@/common/types/ContactType';
import { SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import routers from '@/common/constants/routes';

export type UseContactCreateUpdateProps = {
  contactHookForm: UseFormReturn<ContactFormInput, any, undefined>;
  onSubmit: SubmitHandler<ContactFormInput>;
  autocompleteContacts: UseQueryResult<GetContactDto[], Error>;
  setContactDescription: Dispatch<SetStateAction<string>>;
};

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
  currentContactTypes: DiffContactTypes[];
  onChangeContactType: (e: SelectChangeEvent) => void;
  selectedContactTypes: DiffContactTypes[];
  handleDeleteContactType: (contactType: DiffContactTypes) => void;
  contactDescription: string;
  onClickContactView: (id: string | number) => void;
} & UseContactCreateUpdateProps;

export default function useContactPage(): UseContactPageProps {
  const router = useRouter();
  const [currentContactTypes, setCurrentContactTypes] =
    useState<DiffContactTypes[]>(ContactType);
  const [selectedContactTypes, setSelectedContactTypes] = useState<
    DiffContactTypes[]
  >([]);
  const [contactDescription, setContactDescription] = useState('');
  const [openCreateEditContact, setOpenCreateEditContact] = useState(false);
  const [page, setPage] = useState(0);
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
  
  const onChangeContactType = (e: SelectChangeEvent) => {
    const contactTypeObject = ContactType.find(
      (unit) => unit.value === e.target.value
    );
    if (!!contactTypeObject) {
      setSelectedContactTypes((prevSelectedContactTypes) => [
        ...prevSelectedContactTypes,
        contactTypeObject,
      ]);
      setCurrentContactTypes((prevCurrentContactTypes) =>
        prevCurrentContactTypes.filter(
          (unit) => unit.value !== contactTypeObject.value
        )
      );
    }
  };

  const handleDeleteContactType = (contactType: DiffContactTypes) => {
    setSelectedContactTypes((prevSelectedContactTypes) =>
      prevSelectedContactTypes.filter(
        (unit) => unit.value !== contactType.value
      )
    );
    setCurrentContactTypes((prevCurrentContactTypes) => [
      ...prevCurrentContactTypes,
      contactType,
    ]);
  };

  const onClickContactView = (id: string | number) => {
    router.push(`${routers.contact}/${id}`);
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
    currentContactTypes,
    onChangeContactType,
    selectedContactTypes,
    handleDeleteContactType,
    onClickContactView,
  };
}
