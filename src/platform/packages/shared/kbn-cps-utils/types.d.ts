import type { ProjectRouting } from '@kbn/es-query';
import type { Observable } from 'rxjs';
/**
 * Access levels for project routing picker
 */
export declare enum ProjectRoutingAccess {
    /** Cannot interact with picker - picker is disabled */
    DISABLED = "disabled",
    /** Can view but not edit - shows read-only message */
    READONLY = "readonly",
    /** Full functionality - can change project scope */
    EDITABLE = "editable"
}
export interface CPSProject {
    _id: string;
    _alias: string;
    _type: string;
    _organisation: string;
    _csp?: string;
    _region?: string;
    [key: string]: string | undefined;
}
export interface ProjectTagsResponse {
    origin: Record<string, CPSProject>;
    linked_projects: Record<string, CPSProject>;
}
export interface ProjectsData {
    origin: CPSProject | null;
    linkedProjects: CPSProject[];
}
export interface ICPSManager {
    fetchProjects(): Promise<ProjectsData | null>;
    refresh(): Promise<ProjectsData | null>;
    getProjectRouting$(): Observable<ProjectRouting | undefined>;
    setProjectRouting(projectRouting: ProjectRouting | undefined): void;
    getProjectRouting(overrideValue?: ProjectRouting): ProjectRouting | undefined;
    getDefaultProjectRouting(): ProjectRouting;
    getProjectPickerAccess$(): Observable<ProjectRoutingAccess>;
    getProjectPickerAccess(): ProjectRoutingAccess;
}
