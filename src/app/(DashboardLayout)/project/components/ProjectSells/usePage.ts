import { DeleteFormType, SaleStagesType } from '@/common/types/ProjectTypes';
import { SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useYupValidationResolver } from '@/common/utils/formHook';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { deleteFormDefaultValues, deleteValidationSchema } from './core';
import { SaleStages } from '@/common/constants';
import { apiUnits } from '@/api';
import { UseQueryResult } from '@tanstack/react-query';
import { GetSellDto, GetUnitDto } from '@/common/dto';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { ExceptionCatchResponse } from '@/common/exceptions';
import { apiSales } from '@/api/sales';

export type UsePageProjectAvailableProps = {
  unitDetails: UseQueryResult<GetUnitDto, Error>;
  availableSales: UseQueryResult<{ rows: GetSellDto[]; count: number }, Error>;
  currentSaleStages: SaleStagesType[];
  onChangeSaleStage: (e: SelectChangeEvent) => void;
  handleDeleteStage: (saleStage: SaleStagesType) => void;
  selectedStages: SaleStagesType[];
  deleteHookForm: UseFormReturn<DeleteFormType>;
  selectedUnitId: string | number | string[] | null;
  goBack: () => void;
  rowsPerPage: number;
  changePageSize: (size: number) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  handleClickView: (id: number | string) => void;
  handleClickDelete: (id: number | string, unitName: string) => void;
  selectedSaleToDelete: {
    id: string | number | string[] | null;
    unitName: string;
  } | null;
  onCloseDeleteModal: () => void;
  openDeleteModal: boolean;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  showView: boolean;
  onSubmitDelete: SubmitHandler<DeleteFormType>;
  onSetUnitText: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function usePage(): UsePageProjectAvailableProps {
  const { slug } = useParams();
  const [currentSaleStages, setCurrentSaleStages] =
    useState<SaleStagesType[]>(SaleStages);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<
    string | number | string[] | null
  >(null);
  const [selectedSaleToDelete, setSelectedSaleToDelete] = useState<{
    id: string | number | string[] | null;
    unitName: string;
  } | null>(null);
  const [selectedStages, setSelectedStages] = useState<SaleStagesType[]>([]);
  const [unitText, setUnitText] = useState<string>('');

  const deleteResolver = useYupValidationResolver(deleteValidationSchema);

  const deleteHookForm = useForm<DeleteFormType>({
    resolver: deleteResolver,
    defaultValues: deleteFormDefaultValues,
  });

  const onChangeSaleStage = (e: SelectChangeEvent) => {
    const saleStageObject = SaleStages.find(
      (stage) => stage.value === e.target.value
    );
    if (!!saleStageObject) {
      setSelectedStages((prevSelectedStatuses) => [
        ...prevSelectedStatuses,
        saleStageObject,
      ]);
      setCurrentSaleStages((prevCurrentSaleStages) =>
        prevCurrentSaleStages.filter(
          (stage) => stage.value !== saleStageObject.value
        )
      );
    }
  };

  const handleDeleteStage = (saleStage: SaleStagesType) => {
    setSelectedStages((prevCurrentSaleStages) =>
      prevCurrentSaleStages.filter((stage) => stage.value !== saleStage.value)
    );
    setCurrentSaleStages((prevCurrentSaleStages) => [
      ...prevCurrentSaleStages,
      saleStage,
    ]);
  };

  const goBack = () => {
    setSelectedUnitId(null);
    setShowView(false);
  };

  const changePageSize = (size: number) => {
    setRowsPerPage(size);
  };

  const availableSales = apiSales.useFindAll({
    searchText:unitText,
    pageIndex: page,
    pageSize: rowsPerPage,
    sortOrder: 'DESC',
    sortBy: 'created_at',
    stage: selectedStages.length
      ? selectedStages.map((stage) => stage.value).join(',')
      : '',
    projectId: slug,
  });

  const unitDetails = apiUnits.useFindOne(selectedUnitId!);
  const deleteSale = apiSales.useDelete(selectedSaleToDelete?.id!);

  const onCloseDeleteModal = () => {
    if (!showView) {
      setSelectedSaleToDelete(null);
    }
    setOpenDeleteModal(false);
    deleteHookForm.reset();
  };

  const onSubmitDelete: SubmitHandler<DeleteFormType> = async (data) => {
    try {
      const project = await deleteSale.mutateAsync({ notes: data.notes });
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
        setSelectedSaleToDelete(null);
        setOpenDeleteModal(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const handleClickView = async (id: number | string) => {
    setSelectedUnitId(id);
    setShowView(true);
  };

  const handleClickDelete = (id: number | string, unitName: string) => {
    setSelectedSaleToDelete({ id, unitName });
    setOpenDeleteModal(true);
  };

  const onSetUnitText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnitText(event.target.value);
  };

  return {
    unitDetails,
    availableSales,
    currentSaleStages,
    onChangeSaleStage,
    deleteHookForm,
    handleDeleteStage,
    selectedStages,
    selectedUnitId,
    openDeleteModal,
    setOpenDeleteModal,
    goBack,
    rowsPerPage,
    changePageSize,
    page,
    setPage,
    handleClickView,
    selectedSaleToDelete,
    handleClickDelete,
    onSubmitDelete,
    onCloseDeleteModal,
    showView,
    onSetUnitText,
  };
}
