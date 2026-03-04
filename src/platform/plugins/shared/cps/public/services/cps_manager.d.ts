import type { ApplicationStart, HttpSetup } from '@kbn/core/public';
import type { Logger } from '@kbn/logging';
import type { ProjectRouting } from '@kbn/es-query';
import { BehaviorSubject } from 'rxjs';
import { type ICPSManager, type ProjectsData, ProjectRoutingAccess } from '@kbn/cps-utils';
/**
 * This should be configured on spaces level.
 * Common values: PROJECT_ROUTING.ALL (all projects, will be parsed to undefined on request level), '_alias:_origin' (origin project only)
 */
export declare const DEFAULT_PROJECT_ROUTING: ProjectRouting;
/**
 * Central service for managing project routing and project data.
 *
 * - Fetches project data from ES via `/internal/cps/projects_tags` endpoint (with caching and retry logic)
 * - Manages current project routing state using observables
 * - projectRouting$ represents temporary UI state; apps should reset to their saved value or DEFAULT_PROJECT_ROUTING on navigation
 */
export declare class CPSManager implements ICPSManager {
    private readonly http;
    private readonly logger;
    private readonly application;
    private projectFetcherPromise;
    private readonly projectRouting$;
    private readonly projectPickerAccess$;
    constructor(deps: {
        http: HttpSetup;
        logger: Logger;
        application: ApplicationStart;
    });
    /**
     * Get the current project routing as an observable
     */
    getProjectRouting$(): import("rxjs").Observable<ProjectRouting>;
    /**
     * Set the current project routing
     */
    setProjectRouting(projectRouting: ProjectRouting): void;
    /**
     * Get the current project routing value
     */
    getProjectRouting(overrideValue?: ProjectRouting): ProjectRouting;
    /**
     * Get the default project routing value from a global space setting.
     * This is the fallback value used when no app-specific or saved value exists.
     */
    getDefaultProjectRouting(): ProjectRouting;
    /**
     * Get the project picker access level as an observable.
     * This combines the current app ID and location to determine whether
     * the project picker should be editable, readonly, or disabled.
     */
    getProjectPickerAccess$(): BehaviorSubject<ProjectRoutingAccess>;
    /**
     * Get the current project picker access value
     */
    getProjectPickerAccess(): ProjectRoutingAccess;
    /**
     * Fetches projects from the server with caching and retry logic.
     * Returns cached data if already loaded. If a fetch is already in progress, returns the existing promise.
     * @returns Promise resolving to ProjectsData
     */
    fetchProjects(): Promise<ProjectsData | null>;
    /**
     * Forces a refresh of projects from the server, bypassing the cache.
     * @returns Promise resolving to ProjectsData
     */
    refresh(): Promise<ProjectsData | null>;
    private getProjectFetcher;
}
