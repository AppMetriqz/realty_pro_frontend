import { apiPropertyFeatures, apiProjects } from '@/api';
import { useState } from 'react';
import { ProjectSummaryDto } from '@/common/dto';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { useYupValidationResolver } from '@/common/utils/formHook';
import { ExceptionCatchResponse } from '@/common/exceptions';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { UseQueryResult } from '@tanstack/react-query';
import {
  projectDefaultValues,
  ProjectFormInput,
  updateProjectValidationSchema,
} from '../../core';

export type UseProjectSummaryType = {
  findSummary: UseQueryResult<any, ProjectSummaryDto>;
  showCreateEditProject: boolean;
  setShowCreateEditProject: React.Dispatch<boolean>;
  onSubmit: SubmitHandler<ProjectFormInput>;
  hookForm: UseFormReturn<ProjectFormInput>;
  onCloseCreateModal: () => void;
};

const useProjectSummary = () => {
  const { slug } = useParams();
  const [showCreateEditProject, setShowCreateEditProject] = useState(false);
  const resolver = useYupValidationResolver(updateProjectValidationSchema);

  const hookForm = useForm<ProjectFormInput>({
    resolver,
    defaultValues: projectDefaultValues,
  });

  const findAllProjectFeatures = apiPropertyFeatures.useFindAll({
    pageIndex: 0,
    pageSize: 500,
    type: hookForm.watch('type'),
  });
  const updateProject = apiProjects.useUpdate();

  const onSubmit: SubmitHandler<ProjectFormInput> = async (data) => {
    try {
      const project = await updateProject.mutateAsync({
        ...data,
        property_feature_ids: data.property_feature_ids.join(','),
      });
      if (!!project) {
        toast.success(`Proyecto: ${data.name} actualizado.`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        hookForm.reset();
        setShowCreateEditProject(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onCloseCreateModal = () => {
    setShowCreateEditProject(false);
    hookForm.reset();
  };

  const findSummary = apiProjects.useFindSummary(slug);

  return {
    findSummary,
    onSubmit,
    hookForm,
    showCreateEditProject,
    setShowCreateEditProject,
    listProps: {
      findAllProjectFeatures,
    },
    onCloseCreateModal,
  };
};

export default useProjectSummary;
