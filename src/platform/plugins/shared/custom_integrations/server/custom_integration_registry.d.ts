import type { Logger } from '@kbn/core/server';
import type { CustomIntegration } from '../common';
export declare class CustomIntegrationRegistry {
    private readonly _integrations;
    private readonly _logger;
    private readonly _isDev;
    constructor(logger: Logger, isDev: boolean);
    registerCustomIntegration(customIntegration: CustomIntegration): void;
    getAppendCustomIntegrations(): CustomIntegration[];
    getReplacementCustomIntegrations(): CustomIntegration[];
}
