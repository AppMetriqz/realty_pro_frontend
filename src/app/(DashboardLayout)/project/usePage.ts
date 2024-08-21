import React, { useState } from 'react';
import { apiProjects, apiPropertyFeatures } from '@/api';

import { ExceptionCatchResponse } from '@/common/exceptions';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { useYupValidationResolver } from '@/common/utils/formHook';
import {
  projectDefaultValues,
  ProjectFormInput,
  createProjectValidationSchema,
} from './core';
import { ResultFindAllProjectFeatures } from '@/api/project-features';
import { toast } from 'react-toastify';
import { ProjectDto } from '@/common/dto';

export type UsePageProps = {
  onSubmit: SubmitHandler<ProjectFormInput>;
  hookForm: UseFormReturn<ProjectFormInput>;
  showCreateProject: boolean;
  setShowCreateProject: React.Dispatch<boolean>;
  listProps: {
    findAllProject: ProjectDto[];
    findAllProjectFeatures: ResultFindAllProjectFeatures;
  };
  getCountry: (code: string) => string;
  onCloseCreateProjectModal: () => void;
};

export default function usePage() {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const resolver = useYupValidationResolver(createProjectValidationSchema);

  const hookForm = useForm<ProjectFormInput>({
    resolver,
    defaultValues: projectDefaultValues,
  });

  const findAllProject = apiProjects.useFindAll({
    pageIndex: 0,
    pageSize: 50,
    sortOrder: 'DESC',
    sortBy: 'created_at',
  });
  const createProject = apiProjects.useCreate();

  const findAllProjectFeatures = apiPropertyFeatures.useFindAll({
    pageIndex: 0,
    pageSize: 500,
    type: hookForm.watch('type'),
  });

  const onSubmit: SubmitHandler<ProjectFormInput> = async (data) => {
    try {
      const project = await createProject.mutateAsync({
        ...data,
        property_feature_ids: data.property_feature_ids.join(','),
      });
      if (!!project) {
        toast.success(`Proyecto: ${data.name} creado.`, {
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
        setShowCreateProject(false);
      }
    } catch (error: Error | unknown) {
      ExceptionCatchResponse(error);
    }
  };

  const onCloseCreateProjectModal = () => {
    hookForm.reset();
    setShowCreateProject(false);
  };

  return {
    onSubmit,
    hookForm,
    showCreateProject,
    setShowCreateProject,
    listProps: {
      findAllProject,
      findAllProjectFeatures,
    },
    onCloseCreateProjectModal,
  };
}
