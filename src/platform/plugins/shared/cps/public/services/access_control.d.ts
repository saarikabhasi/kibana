import { ProjectRoutingAccess } from '@kbn/cps-utils';
/**
 * Rule for determining access based on route pattern
 */
export interface RouteAccessRule {
    /** Regex pattern to match against location hash */
    pattern: RegExp;
    /** Access level to grant when pattern matches */
    access: ProjectRoutingAccess;
}
/**
 * Configuration for a single app's access control
 */
export interface AppAccessConfig {
    /** Default access level for this app (when no route rules match) */
    defaultAccess: ProjectRoutingAccess;
    /** Optional route-specific rules (checked in order) */
    routeRules?: RouteAccessRule[];
    /** Optional custom readonly message for this app */
    readonlyMessage?: string;
}
/**
 * Complete access control configuration
 * Maps app IDs to their access configurations
 */
export type AccessControlConfig = Record<string, AppAccessConfig>;
/**
 * Default access control configuration
 *
 * Access Levels:
 * - EDITABLE: Full functionality - users can change project scope
 * - READONLY: View-only mode - shows current scope but prevents changes
 * - DISABLED: Picker is completely disabled
 *
 */
export declare const ACCESS_CONTROL_CONFIG: AccessControlConfig;
/**
 * Determines project routing access level based on app and route
 */
export declare const getProjectRoutingAccess: (currentAppId: string, hash: string) => ProjectRoutingAccess;
