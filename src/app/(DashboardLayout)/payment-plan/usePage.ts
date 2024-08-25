import React, {Dispatch, SetStateAction, useState} from 'react';
import {apiProjects} from '@/api';
import {ProjectDto} from '@/common/dto';
import {UseQueryResult} from '@tanstack/react-query';
import {useDebouncedCallback} from 'use-debounce';
import _ from 'lodash';


export interface UsePageProps {
    handleRemoveProjects: (value: ProjectDto) => void;
    onSetSelectedProjects: Dispatch<SetStateAction<any>>;
    projectText: string;
    selectedProject: ProjectDto | null;
    selectedProjects: ProjectDto[];
    projects: UseQueryResult<ProjectDto[], Error>;
    debouncedProjectText: Dispatch<SetStateAction<string>>;

}

export default function usePage() {
    const [selectedProjects, setSelectedProjects] = useState<ProjectDto[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(
        null
    );
    const [projectText, setProjectText] = useState<string>('');

    const projects = apiProjects.useFindAllAutocomplete({
        description: projectText,
    });

    const handleRemoveProjects = (value: ProjectDto) => {
        setSelectedProjects(
            _.filter(selectedProjects, (item) => item.project_id !== value.project_id)
        );
    };


    const onSetSelectedProjects = (value: ProjectDto) => {
        setSelectedProject(null);
        setSelectedProjects(
            _.uniqBy(_.concat(selectedProjects, [value]), 'project_id')
        );
    };

    const debouncedProjectText = useDebouncedCallback((value) => {
        setProjectText(value ?? '');
    }, 1000);

    return {
        handleRemoveProjects,
        projects,
        projectText,
        selectedProjects,
        onSetSelectedProjects,
        debouncedProjectText,
        selectedProject,
    };
}
