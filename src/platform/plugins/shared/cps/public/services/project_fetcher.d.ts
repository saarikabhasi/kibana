import type { HttpSetup } from '@kbn/core/public';
import type { Logger } from '@kbn/logging';
import type { ProjectsData } from '@kbn/cps-utils';
export interface ProjectFetcher {
    fetchProjects: () => Promise<ProjectsData | null>;
    refresh: () => Promise<ProjectsData | null>;
}
/**
 * Creates project fetcher with caching and retry logic
 */
export declare function createProjectFetcher(http: HttpSetup, logger: Logger): ProjectFetcher;
