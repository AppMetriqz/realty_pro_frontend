import React, { useState } from 'react';
import { apiProjects, apiPropertyFeatures, apiUnits } from '@/api';
import { ResultFindAllProjectFeatures } from '@/api/project-features';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import {
  unitDefaultValues,
  UnitFormInput,
  createUnitValidationSchema,
} from './core';
import { useYupValidationResolver } from '@/common/utils/formHook';
import { toast } from 'react-toastify';
import { ExceptionCatchResponse } from '@/common/exceptions';
import { useParams } from 'next/navigation';
import { ProjectDto } from '@/common/dto';
import { UseQueryResult } from '@tanstack/react-query';

export type CreateUnitProjectProps = {
  hookForm: UseFormReturn<UnitFormInput>;
  onSubmitUnit: SubmitHandler<UnitFormInput>;
  listProps: {
    findAllProjectFeatures: ResultFindAllProjectFeatures;
  };
};

export type UseProjectPageProps = {
  findProject: UseQueryResult<ProjectDto, Error>;
  currentTabValue: number;
  setCurrentTabValue: React.Dispatch<number>;
  handleChangeTab: (_: React.SyntheticEvent, newValue: number) => void;
  showCreateUnit: boolean;
  setShowCreateUnit: React.Dispatch<boolean>;
  onCloseCreateUnitModal: () => void;
} & CreateUnitProjectProps;

export default function usePage() {
  const { slug } = useParams();
  const [currentTabValue, setCurrentTabValue] = useState(0);
  const [showCreateUnit, setShowCreateUnit] = useState(false);
  const resolver = useYupValidationResolver(createUnitValidationSchema);

  const unitHookForm = useForm<UnitFormInput>({
    resolver,
    defaultValues: unitDefaultValues,
  });

  const createUnit = apiUnits.useCreate();

  const findAllProjectFeatures = apiPropertyFeatures.useFindAll({
    pageIndex: 0,
    pageSize: 500,
    type: unitHookForm.watch('type'),
  });

  const onSubmitUnit: SubmitHandler<UnitFormInput> = async (data) => {
    try {
      const project = await createUnit.mutateAsync({
        ...data,
        price: Number(data.price.replace(/[^0-9.-]+/g, '')),
        property_feature_ids: data.property_feature_ids.join(','),
        cover: data.cover,
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
        unitHookForm.reset();
        setShowCreateUnit(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onCloseCreateUnitModal = () => {
    unitHookForm.reset();
    setShowCreateUnit(false);
  };

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTabValue(newValue);
  };

  const findProject = apiProjects.useFindOne(slug);

  return {
    findProject,
    onSubmitUnit,
    hookForm: unitHookForm,
    showCreateUnit,
    setShowCreateUnit,
    currentTabValue,
    setCurrentTabValue,
    handleChangeTab,
    listProps: {
      findAllProjectFeatures,
    },
    onCloseCreateUnitModal,
  };
}
