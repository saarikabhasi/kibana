import React from 'react';
import type { ProjectRouting } from '@kbn/es-query';
import type { ProjectsData } from '../types';
export interface ProjectPickerProps {
    projectRouting?: ProjectRouting;
    onProjectRoutingChange: (projectRouting: ProjectRouting) => void;
    fetchProjects: () => Promise<ProjectsData | null>;
    isReadonly?: boolean;
    settingsComponent?: React.ReactNode;
}
export declare const ProjectPicker: ({ projectRouting, onProjectRoutingChange, fetchProjects, isReadonly, settingsComponent, }: ProjectPickerProps) => React.JSX.Element | null;
export declare const DisabledProjectPicker: ({ fetchProjects, }: {
    fetchProjects: () => Promise<ProjectsData | null>;
}) => React.JSX.Element | null;
