import { DeleteFormType } from '@/common/types/ProjectTypes';
import { Dispatch, SetStateAction, useState } from 'react';
import { useYupValidationResolver } from '@/common/utils/formHook';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import {
  propertyFeatureFormDefaultValues,
  propertyFeatureValidationSchema,
} from './core';
import { apiPropertyFeatures } from '@/api';
import { UseQueryResult } from '@tanstack/react-query';
import {
  CreateUpdatePropertyFeaturesDto,
  GetPropertyFeaturesDto,
} from '@/common/dto';
import { toast } from 'react-toastify';
import { ExceptionCatchResponse } from '@/common/exceptions';

export type UsePageProjectAvailableProps = {
  rowsPerPage: { value: number; label: string };
  changePageSize: (size: number) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  handleClickEdit: (data: GetPropertyFeaturesDto) => void;
  handleClickDelete: (data: GetPropertyFeaturesDto) => void;
  selectedPropertyFeatureToDelete: number | null;
  onCloseDeleteModal: () => void;
  onCloseCreateEditModal: () => void;
  openDeleteModal: boolean;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  onSubmitDelete: SubmitHandler<DeleteFormType>;
  setOpenCreateEditModal: Dispatch<SetStateAction<boolean>>;
  propertyFeatureList: UseQueryResult<
    { rows: GetPropertyFeaturesDto[]; count: number },
    Error
  >;
  openCreateEditModal: boolean;
  propertyFeatureHookForm: UseFormReturn<
    CreateUpdatePropertyFeaturesDto,
    any,
    undefined
  >;
  onSubmitUser: SubmitHandler<CreateUpdatePropertyFeaturesDto>;
  isEdit: boolean;
};

export default function usePage(): UsePageProjectAvailableProps {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState({ label: '50', value: 50 });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
  const [selectedPropertyFeatureToDelete, setSelectedPropertyFeatureToDelete] =
    useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const createResolver = useYupValidationResolver(
    propertyFeatureValidationSchema
  );

  const propertyFeatureHookForm = useForm<CreateUpdatePropertyFeaturesDto>({
    resolver: createResolver,
    defaultValues: propertyFeatureFormDefaultValues,
  });

  const changePageSize = (size: number) => {
    setRowsPerPage({
      value: size,
      label: size === -1 ? 'Todos' : size.toString(),
    });
  };

  const propertyFeatureList = apiPropertyFeatures.useFindAll(
    {
      pageIndex: page,
      pageSize: rowsPerPage.value === -1 ? 100000 : rowsPerPage.value,
      sortOrder: 'DESC',
      sortBy: 'created_at',
    },
    true
  );

  const deleteFeatures = apiPropertyFeatures.useDelete(
    selectedPropertyFeatureToDelete
  );
  const createFeatures = apiPropertyFeatures.useCreate();
  const updateFeatures = apiPropertyFeatures.useUpdate();

  const onCloseDeleteModal = () => {
    setSelectedPropertyFeatureToDelete(null);
    setOpenDeleteModal(false);
  };

  const onCloseCreateEditModal = () => {
    setIsEdit(false);
    propertyFeatureHookForm.reset();
    setOpenCreateEditModal(false);
  };

  const onSubmitDelete = async () => {
    try {
      const project = await deleteFeatures.mutateAsync();
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
        setSelectedPropertyFeatureToDelete(null);
        setOpenDeleteModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const handleClickEdit = async (data: GetPropertyFeaturesDto) => {
    propertyFeatureHookForm.setValue(
      'property_feature_id',
      data.property_feature_id
    );
    propertyFeatureHookForm.setValue('description', data.description);
    propertyFeatureHookForm.setValue('type', data.type);
    propertyFeatureHookForm.setValue('is_active', data.is_active);
    setIsEdit(true);
    setOpenCreateEditModal(true);
  };

  const handleClickDelete = async (data: GetPropertyFeaturesDto) => {
    setSelectedPropertyFeatureToDelete(data.property_feature_id);
    setOpenDeleteModal(true);
  };

  const onSubmitUser: SubmitHandler<CreateUpdatePropertyFeaturesDto> = async (
    data
  ) => {
    try {
      const features = isEdit
        ? await updateFeatures.mutateAsync(data)
        : await createFeatures.mutateAsync(data);
      if (!!features) {
        toast.success(`Carasteristica ${isEdit ? 'Actualizado' : 'Creado'}.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        propertyFeatureHookForm.reset();
        setOpenCreateEditModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  return {
    propertyFeatureList,
    openDeleteModal,
    setOpenDeleteModal,
    rowsPerPage,
    changePageSize,
    page,
    setPage,
    handleClickEdit,
    selectedPropertyFeatureToDelete,
    handleClickDelete,
    onSubmitDelete,
    onCloseDeleteModal,
    onCloseCreateEditModal,
    setOpenCreateEditModal,
    openCreateEditModal,
    propertyFeatureHookForm,
    onSubmitUser,
    isEdit,
  };
}
