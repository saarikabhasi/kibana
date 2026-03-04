import type { Logger, SavedObjectsClientContract } from '@kbn/core/server';
import type { ApiKeyIdAndSOId, UiamApiKeyAndSOId } from './get_api_key_ids_to_invalidate';
import type { ApiKeyInvalidationFn, UiamApiKeyInvalidationFn } from '../invalidate_api_keys_task';
interface InvalidateApiKeysAndDeleteSO {
    apiKeyIdsToInvalidate: ApiKeyIdAndSOId[];
    uiamApiKeysToInvalidate?: UiamApiKeyAndSOId[];
    invalidateApiKeyFn?: ApiKeyInvalidationFn;
    invalidateUiamApiKeyFn?: UiamApiKeyInvalidationFn;
    logger: Logger;
    savedObjectsClient: SavedObjectsClientContract;
    savedObjectType: string;
}
export declare function invalidateApiKeysAndDeletePendingApiKeySavedObject({ apiKeyIdsToInvalidate, uiamApiKeysToInvalidate, invalidateApiKeyFn, invalidateUiamApiKeyFn, logger, savedObjectsClient, savedObjectType, }: InvalidateApiKeysAndDeleteSO): Promise<number>;
export {};
