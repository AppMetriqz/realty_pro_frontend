import { DeleteFormType } from '@/common/types/ProjectTypes';
import { Dispatch, SetStateAction, useState } from 'react';
import { useYupValidationResolver } from '@/common/utils/formHook';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import {
  deleteFormDefaultValues,
  deleteValidationSchema,
  userFormDefaultValues,
  userValidationSchema,
} from './core';
import { apiUser } from '@/api';
import { UseQueryResult } from '@tanstack/react-query';
import { CreateUpdateUserDto, GetUserDto } from '@/common/dto';
import { toast } from 'react-toastify';
import { ExceptionCatchResponse } from '@/common/exceptions';

export type UsePageProjectAvailableProps = {
  deleteHookForm: UseFormReturn<DeleteFormType>;
  rowsPerPage: number;
  changePageSize: (size: number) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  handleClickEdit: (user: Partial<GetUserDto> & { id: number }) => void;
  handleClickDelete: (id: number | string, unitName: string) => void;
  selectedUserToDelete: {
    id: string | number | string[] | null;
    userName: string;
  } | null;
  onCloseDeleteModal: () => void;
  onCloseCreateEditModal: () => void;
  openDeleteModal: boolean;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  onSubmitDelete: SubmitHandler<DeleteFormType>;
  onSetUserText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenCreateEditModal: Dispatch<SetStateAction<boolean>>;
  allUsers: UseQueryResult<
    {
      rows: GetUserDto[];
      count: number;
    },
    Error
  >;
  showPassword: boolean;
  handleClickShowPassword: () => void;
  openCreateEditModal: boolean;
  userHookForm: UseFormReturn<CreateUpdateUserDto, any, undefined>;
  onSubmitUser: SubmitHandler<CreateUpdateUserDto>;
  isEdit: boolean;
};

export default function usePage(): UsePageProjectAvailableProps {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<{
    id: string | number | string[] | null;
    userName: string;
  } | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [unitText, setUserText] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const deleteResolver = useYupValidationResolver(deleteValidationSchema);
  const createResolver = useYupValidationResolver(userValidationSchema);

  const userHookForm = useForm<CreateUpdateUserDto>({
    resolver: createResolver,
    defaultValues: userFormDefaultValues,
  });

  const deleteHookForm = useForm<DeleteFormType>({
    resolver: deleteResolver,
    defaultValues: deleteFormDefaultValues,
  });

  const changePageSize = (size: number) => {
    setRowsPerPage(size);
  };

  const allUsers = apiUser.useFindAll({
    pageIndex: page,
    pageSize: rowsPerPage,
    sortOrder: 'DESC',
    sortBy: 'created_at',
  });

  const deleteUser = apiUser.useDelete(selectedUserToDelete?.id!);
  const createUser = apiUser.useCreate();
  const updateUser = apiUser.useUpdate();

  const onCloseDeleteModal = () => {
    setSelectedUserToDelete(null);
    setOpenDeleteModal(false);
    deleteHookForm.reset();
  };

  const onCloseCreateEditModal = () => {
    setIsEdit(false);
    setOpenCreateEditModal(false);
    userHookForm.reset();
  };

  const onSubmitDelete: SubmitHandler<DeleteFormType> = async (data) => {
    try {
      const project = await deleteUser.mutateAsync({ notes: data.notes });
      if (!!project) {
        toast.success(`Usuario Eliminado.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        deleteHookForm.reset();
        setSelectedUserToDelete(null);
        setOpenDeleteModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const handleClickEdit = async (
    user: Partial<GetUserDto> & { id: number }
  ) => {
    if (user.user_id) userHookForm.setValue('user_id', user.user_id);
    if (user.first_name) userHookForm.setValue('first_name', user.first_name);
    if (user.last_name) userHookForm.setValue('last_name', user.last_name);
    if (user.role_id) userHookForm.setValue('role_id', user.role_id);
    if (user.email) userHookForm.setValue('email', user.email);
    if (user.phone_number)
      userHookForm.setValue('phone_number', user.phone_number);
    if (user.national_id)
      userHookForm.setValue('national_id', user.national_id);
    setIsEdit(true);
    setOpenCreateEditModal(true);
  };

  const handleClickDelete = (id: number | string, userName: string) => {
    setSelectedUserToDelete({ id, userName });
    setOpenDeleteModal(true);
  };

  const onSetUserText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserText(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmitUser: SubmitHandler<CreateUpdateUserDto> = async (data) => {
    try {
      const user = isEdit
        ? await updateUser.mutateAsync(data)
        : await createUser.mutateAsync(data);
      if (!!user) {
        toast.success(`Usuario ${isEdit ? 'Actualizado' : 'Creado'}.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        userHookForm.reset();
        setOpenCreateEditModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  return {
    allUsers,
    deleteHookForm,
    openDeleteModal,
    setOpenDeleteModal,
    rowsPerPage,
    changePageSize,
    page,
    setPage,
    handleClickEdit,
    selectedUserToDelete,
    handleClickDelete,
    onSubmitDelete,
    onCloseDeleteModal,
    onCloseCreateEditModal,
    onSetUserText,
    setOpenCreateEditModal,
    showPassword,
    handleClickShowPassword,
    openCreateEditModal,
    userHookForm,
    onSubmitUser,
    isEdit,
  };
}
