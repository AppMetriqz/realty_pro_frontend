import { DeleteFormType, UnitStatusType } from '@/common/types/ProjectTypes';
import { SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useYupValidationResolver } from '@/common/utils/formHook';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import {
  cancelSaleFormDefaultValues,
  cancelSaleValidationSchema,
  deleteFormDefaultValues,
  deleteValidationSchema,
  sellFormDefaultValues,
  sellValidationSchema,
} from './core';
import { UnitStatus } from '@/common/constants';
import { apiContacts, apiPropertyFeatures, apiSales, apiUnits } from '@/api';
import { UseQueryResult } from '@tanstack/react-query';
import { GetContactDto, GetUnitDto } from '@/common/dto';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { ExceptionCatchResponse } from '@/common/exceptions';
import {
  multipleUnitDefaultValues,
  MultipleUnitFormInput,
  unitDefaultValues,
  UnitFormInput,
  updateMultipleUnitValidationSchema,
  updateUnitValidationSchema,
} from '../../[slug]/core';
import { ResultFindAllProjectFeatures } from '@/api/project-features';
import { CancelUnitSaleType, SellFormType } from '@/common/types/SellTypes';

export type UpdateUnitProjectProps = {
  hookForm: UseFormReturn<UnitFormInput>;
  onSubmitUnit: SubmitHandler<UnitFormInput>;
  listProps: {
    findAllProjectFeatures: ResultFindAllProjectFeatures;
  };
};

export type UsePageProjectAvailableProps = {
  unitDetails: UseQueryResult<any, GetUnitDto>;
  availableUnits: UseQueryResult<any, GetUnitDto[]>;
  currentUnitStatuses: UnitStatusType[];
  onChangeStatus: (e: SelectChangeEvent) => void;
  handleDeleteStatus: (status: UnitStatusType) => void;
  selectedStatuses: UnitStatusType[];
  deleteHookForm: UseFormReturn<DeleteFormType>;
  selectedUnitId: string | number | string[] | null;
  onClickEditUnit: () => void;
  goBack: () => void;
  rowsPerPage: number;
  changePageSize: (size: number) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  handleClickView: (id: string | number) => void;
  handleClickSell: (id: string | number) => void;
  handleClickEdit: (id: string | number) => void;
  handleClickDelete: (id: string | number) => void;
  onCloseDeleteModal: () => void;
  openDeleteModal: boolean;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  showView: boolean;
  selectedUnits: readonly (string | number)[];
  setSelectedUnits: Dispatch<SetStateAction<readonly (string | number)[]>>;
  openSellModal: boolean;
  setOpenSellModal: Dispatch<SetStateAction<boolean>>;
  onCloseSellModal: () => void;
  onSubmitDelete: SubmitHandler<DeleteFormType>;
  onSubmitSell: SubmitHandler<SellFormType>;
  sellHookForm: UseFormReturn<SellFormType>;
  openEditOneUnitModal: boolean;
  onCloseEditOneUnitModal: () => void;
  openEditMultipleUnitModal: boolean;
  setOpenEditMultipleUnitModal: Dispatch<SetStateAction<boolean>>;
  onCloseEditMultipleUnitModal: () => void;
  multipleUnitHookForm: UseFormReturn<MultipleUnitFormInput>;
  onSubmitMultipleUnit: SubmitHandler<MultipleUnitFormInput>;
  setSellerDescription: Dispatch<SetStateAction<string>>;
  sellerAutocompleteContacts: UseQueryResult<any, GetContactDto[]>;
  setClientDescription: Dispatch<SetStateAction<string>>;
  clientAutocompleteContacts: UseQueryResult<any, GetContactDto[]>;
  handleClickCancelSale: (id: string | number) => void;
  onSubmitCancelSale: SubmitHandler<CancelUnitSaleType>;
  openCancelSellModal: boolean;
  onCloseCancelSellModal: () => void;
  cancelSellHookForm: UseFormReturn<CancelUnitSaleType>;
} & UpdateUnitProjectProps;

export default function usePage(): UsePageProjectAvailableProps {
  const { slug } = useParams();
  const [currentUnitStatuses, setCurrentUnitStatuses] =
    useState<UnitStatusType[]>(UnitStatus);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [openCancelSellModal, setOpenCancelSellModal] = useState(false);
  const [openEditOneUnitModal, setOpenEditOneUnitModal] = useState(false);
  const [openEditMultipleUnitModal, setOpenEditMultipleUnitModal] =
    useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<
    string | number | string[] | null
  >(null);
  const [selectedStatuses, setSelectedstatuses] = useState<UnitStatusType[]>(
    []
  );
  const [selectedUnits, setSelectedUnits] = useState<
    readonly (string | number)[]
  >([]);
  const [sellerDescription, setSellerDescription] = useState('');
  const [clientDescription, setClientDescription] = useState('');

  const deleteResolver = useYupValidationResolver(deleteValidationSchema);
  const caancelSellResolver = useYupValidationResolver(
    cancelSaleValidationSchema
  );
  const sellResolver = useYupValidationResolver(sellValidationSchema);
  const unitResolver = useYupValidationResolver(updateUnitValidationSchema);
  const multipleUnitResolver = useYupValidationResolver(
    updateMultipleUnitValidationSchema
  );

  const deleteHookForm = useForm<DeleteFormType>({
    resolver: deleteResolver,
    defaultValues: deleteFormDefaultValues,
  });
  const cancelSellHookForm = useForm<CancelUnitSaleType>({
    resolver: caancelSellResolver,
    defaultValues: cancelSaleFormDefaultValues,
  });
  const sellHookForm = useForm<SellFormType>({
    resolver: sellResolver,
    defaultValues: sellFormDefaultValues,
  });
  const unitHookForm = useForm<UnitFormInput>({
    resolver: unitResolver,
    defaultValues: unitDefaultValues,
  });
  const multipleUnitHookForm = useForm<MultipleUnitFormInput>({
    resolver: multipleUnitResolver,
    defaultValues: multipleUnitDefaultValues,
  });
  const sellerAutocompleteContacts = apiContacts.useFindAllAutocomplete({
    description: sellerDescription,
  });
  const clientAutocompleteContacts = apiContacts.useFindAllAutocomplete({
    description: clientDescription,
  });

  const findAllProjectFeatures = apiPropertyFeatures.useFindAll({
    pageIndex: 0,
    pageSize: 500,
    type: unitHookForm.watch('type'),
  });
  const onChangeStatus = (e: SelectChangeEvent) => {
    const unitObject = UnitStatus.find((unit) => unit.value === e.target.value);
    if (!!unitObject) {
      setSelectedstatuses((prevSelectedStatuses) => [
        ...prevSelectedStatuses,
        unitObject,
      ]);
      setCurrentUnitStatuses((prevCurrentUnitStatuses) =>
        prevCurrentUnitStatuses.filter(
          (unit) => unit.value !== unitObject.value
        )
      );
    }
  };

  const handleDeleteStatus = (status: UnitStatusType) => {
    setSelectedstatuses((prevSelectedStatuses) =>
      prevSelectedStatuses.filter((unit) => unit.value !== status.value)
    );
    setCurrentUnitStatuses((prevCurrentUnitStatuses) => [
      ...prevCurrentUnitStatuses,
      status,
    ]);
  };

  const goBack = () => {
    setSelectedUnitId(null);
    setShowView(false);
  };

  const onClickEditUnit = () => {
    setOpenEditOneUnitModal(true);
  };

  const changePageSize = (size: number) => {
    setRowsPerPage(size);
  };

  const availableUnits = apiUnits.useFindAll({
    pageIndex: page,
    pageSize: rowsPerPage,
    sortOrder: 'DESC',
    sortBy: 'created_at',
    status: selectedStatuses.length
      ? selectedStatuses.map((status) => status.value).join(',')
      : '',
    projectId: slug,
  });

  const unitDetails = apiUnits.useFindOne(selectedUnitId!);
  const deleteUnit = apiUnits.useDelete(selectedUnitId!);
  const updateUnit = apiUnits.useUpdate();
  const updateAllUnit = apiUnits.useUpdateAll();
  const cancelUnitSale = apiUnits.useCancelSaleUnit();
  const createSale = apiSales.useCreate();

  const onSubmitUnit: SubmitHandler<UnitFormInput> = async (data) => {
    try {
      const project = await updateUnit.mutateAsync({
        ...data,
        unit_id: selectedUnitId,
        price: Number(data.price.replace(/[^0-9.-]+/g, '')),
        property_feature_ids: data.property_feature_ids.join(','),
      });
      if (!!project) {
        toast.success(`Unidad: ${data.name} creada.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        cancelSellHookForm.reset();
        setOpenCancelSellModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onCloseDeleteModal = () => {
    if (!showView) {
      setSelectedUnitId(null);
    }
    setOpenDeleteModal(false);
    deleteHookForm.reset();
  };

  const onCloseCancelSellModal = () => {
    if (!showView) {
      setSelectedUnitId(null);
    }
    setOpenCancelSellModal(false);
    cancelSellHookForm.reset();
  };

  const onCloseSellModal = () => {
    if (!showView) {
      setSelectedUnitId(null);
    }
    setOpenSellModal(false);
    sellHookForm.reset();
  };

  const onCloseEditOneUnitModal = () => {
    if (!showView) {
      setSelectedUnitId(null);
    }
    setOpenEditOneUnitModal(false);
    unitHookForm.reset();
  };

  const onCloseEditMultipleUnitModal = () => {
    if (!showView) {
      setSelectedUnitId(null);
    }
    setOpenEditMultipleUnitModal(false);
    multipleUnitHookForm.reset();
  };

  const onSubmitDelete: SubmitHandler<DeleteFormType> = async (data) => {
    try {
      const project = await deleteUnit.mutateAsync({ notes: data.notes });
      if (!!project) {
        toast.success(`Unidad Eliminada.`, {
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
        setSelectedUnitId(null);
        setOpenDeleteModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onSubmitMultipleUnit: SubmitHandler<MultipleUnitFormInput> = async (
    data
  ) => {
    try {
      const project = await updateAllUnit.mutateAsync({
        ...data,
        project_id: slug,
        price: Number(data.price?.replace(/[^0-9.-]+/g, '')),
        price_per_meter: data.price_per_meter
          ? Number(data.price_per_meter?.replace(/[^0-9.-]+/g, ''))
          : undefined,
        unit_ids: selectedUnits.join(','),
      });
      if (!!project) {
        toast.success(`Unidades (${selectedUnits.length}) actualizadas.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        multipleUnitHookForm.reset();
        setOpenEditMultipleUnitModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onSubmitSell: SubmitHandler<SellFormType> = async (data) => {
    try {
      const sale = await createSale.mutateAsync({
        project_id: slug,
        unit_id: selectedUnitId,
        client_id: parseInt(data.client_id),
        seller_id: parseInt(data.seller_id),
        commission: data.commission / 100,
        notes: data.notes,
      });
      if (!!sale) {
        toast.success(`Venta creada.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        sellHookForm.reset();
        setOpenSellModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onSubmitCancelSale: SubmitHandler<CancelUnitSaleType> = async (
    data
  ) => {
    try {
      console.log(unitDetails.data);
      const project = await cancelUnitSale.mutateAsync({
        sale_id: unitDetails.data.sale.sale_id,
        notes: data.notes,
      });
      if (!!project) {
        toast.success(`Venta cancelada satisfactoriamente.`, {
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
        setSelectedUnitId(null);
        setOpenDeleteModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const handleClickView = async (id: string | number) => {
    setSelectedUnitId(id);
    setShowView(true);
  };

  const handleClickSell = async (id: string | number) => {
    setSelectedUnitId(id);
    setOpenSellModal(true);
  };

  const handleClickEdit = (id: string | number) => {
    setSelectedUnitId(id);
    setOpenEditOneUnitModal(true);
  };

  const handleClickDelete = (id: string | number) => {
    setSelectedUnitId(id);
    setOpenDeleteModal(true);
  };

  const handleClickCancelSale = (id: string | number) => {
    setSelectedUnitId(id);
    setOpenCancelSellModal(true);
  };

  return {
    unitDetails,
    availableUnits,
    currentUnitStatuses,
    onChangeStatus,
    deleteHookForm,
    handleDeleteStatus,
    selectedStatuses,
    selectedUnitId,
    openDeleteModal,
    setOpenDeleteModal,
    onClickEditUnit,
    goBack,
    rowsPerPage,
    changePageSize,
    page,
    setPage,
    handleClickView,
    handleClickSell,
    handleClickEdit,
    handleClickDelete,
    onSubmitDelete,
    onCloseDeleteModal,
    showView,
    selectedUnits,
    setSelectedUnits,
    openSellModal,
    setOpenSellModal,
    onCloseSellModal,
    onSubmitSell,
    sellHookForm,
    openEditOneUnitModal,
    onCloseEditOneUnitModal,
    hookForm: unitHookForm,
    onSubmitUnit,
    listProps: {
      findAllProjectFeatures,
    },
    onCloseEditMultipleUnitModal,
    openEditMultipleUnitModal,
    setOpenEditMultipleUnitModal,
    multipleUnitHookForm,
    onSubmitMultipleUnit,
    setSellerDescription,
    sellerAutocompleteContacts,
    setClientDescription,
    clientAutocompleteContacts,
    handleClickCancelSale,
    onSubmitCancelSale,
    openCancelSellModal,
    onCloseCancelSellModal,
    cancelSellHookForm,
  };
}
