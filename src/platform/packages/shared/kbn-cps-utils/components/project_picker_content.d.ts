import React from 'react';
import type { ProjectRouting } from '@kbn/es-query';
import type { ProjectsData } from '../types';
export interface ProjectPickerContentProps {
    projectRouting?: ProjectRouting;
    onProjectRoutingChange: (projectRouting: ProjectRouting) => void;
    fetchProjects: () => Promise<ProjectsData | null>;
    isReadonly?: boolean;
    settingsComponent?: React.ReactNode;
}
export declare const ProjectPickerContent: ({ projectRouting, onProjectRoutingChange, fetchProjects, isReadonly, settingsComponent, }: ProjectPickerContentProps) => React.JSX.Element | null;
