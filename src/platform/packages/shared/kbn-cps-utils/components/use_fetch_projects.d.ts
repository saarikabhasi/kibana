import type { CPSProject, ProjectsData } from '../types';
/**
 * Hook for fetching projects data from CPSManager
 */
export declare const useFetchProjects: (fetchProjects: () => Promise<ProjectsData | null>) => {
    originProject: CPSProject | null;
    linkedProjects: CPSProject[];
};
