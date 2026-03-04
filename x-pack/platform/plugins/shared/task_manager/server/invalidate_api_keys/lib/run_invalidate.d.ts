import type { Logger, SavedObjectsClientContract } from '@kbn/core/server';
import type { EncryptedSavedObjectsClient } from '@kbn/encrypted-saved-objects-shared';
import type { ApiKeyInvalidationFn, UiamApiKeyInvalidationFn } from '../invalidate_api_keys_task';
export interface SavedObjectTypesToQuery {
    type: string;
    apiKeyAttributePath: string;
}
interface RunInvalidateOpts {
    encryptedSavedObjectsClient?: EncryptedSavedObjectsClient;
    invalidateApiKeyFn?: ApiKeyInvalidationFn;
    invalidateUiamApiKeyFn?: UiamApiKeyInvalidationFn;
    logger: Logger;
    removalDelay: string;
    savedObjectsClient: SavedObjectsClientContract;
    savedObjectType: string;
    savedObjectTypesToQuery: SavedObjectTypesToQuery[];
}
export declare function runInvalidate(opts: RunInvalidateOpts): Promise<number>;
export {};
