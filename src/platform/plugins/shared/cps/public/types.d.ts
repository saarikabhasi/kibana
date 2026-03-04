import type { ICPSManager } from '@kbn/cps-utils';
export interface CPSPluginSetup {
    cpsEnabled?: boolean;
}
export interface CPSConfigType {
    cpsEnabled: boolean;
}
export interface CPSServerStart {
}
export interface CPSServerStop {
}
export interface CPSPluginStart {
    cpsManager?: ICPSManager;
}
