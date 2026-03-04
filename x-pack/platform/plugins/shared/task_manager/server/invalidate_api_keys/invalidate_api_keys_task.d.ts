import type { Logger } from '@kbn/logging';
import type { CoreStart } from '@kbn/core-lifecycle-server';
import type { InvalidateAPIKeyResult, InvalidateAPIKeysParams, InvalidateUiamAPIKeyParams } from '@kbn/security-plugin-types-server';
import type { KibanaRequest } from '@kbn/core/server';
import type { TaskScheduling } from '../task_scheduling';
import type { TaskTypeDictionary } from '../task_type_dictionary';
import type { TaskManagerStartContract } from '..';
import type { TaskManagerPluginsStart } from '../plugin';
export declare const TASK_ID = "invalidate_api_keys";
export type ApiKeyInvalidationFn = (params: InvalidateAPIKeysParams) => Promise<InvalidateAPIKeyResult | null> | undefined;
export type UiamApiKeyInvalidationFn = (request: KibanaRequest, params: InvalidateUiamAPIKeyParams) => Promise<InvalidateAPIKeyResult | null>;
export declare function scheduleInvalidateApiKeyTask(logger: Logger, taskScheduling: TaskScheduling, interval: string): Promise<void>;
interface RegisterInvalidateApiKeyTaskOpts {
    configInterval: string;
    coreStartServices: () => Promise<[CoreStart, TaskManagerPluginsStart, TaskManagerStartContract]>;
    invalidateApiKeyFn?: ApiKeyInvalidationFn;
    logger: Logger;
    removalDelay: string;
    taskTypeDictionary: TaskTypeDictionary;
}
export declare function registerInvalidateApiKeyTask(opts: RegisterInvalidateApiKeyTaskOpts): void;
type InvalidateApiKeysTaskRunnerOpts = Pick<RegisterInvalidateApiKeyTaskOpts, 'logger' | 'configInterval' | 'coreStartServices' | 'invalidateApiKeyFn' | 'removalDelay'>;
export declare function taskRunner(opts: InvalidateApiKeysTaskRunnerOpts): () => {
    run(): Promise<{
        state: {};
        schedule: {
            interval: string;
        };
    }>;
};
export {};
