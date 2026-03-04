import type { CustomIntegration } from '../common';
export interface CustomIntegrationsPluginSetup {
    registerCustomIntegration(customIntegration: Omit<CustomIntegration, 'type'>): void;
    getAppendCustomIntegrations(): CustomIntegration[];
}
export interface CustomIntegrationsPluginStart {
}
