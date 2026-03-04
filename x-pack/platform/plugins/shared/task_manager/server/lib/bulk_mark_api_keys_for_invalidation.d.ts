import type { Logger, SavedObjectsClientContract } from '@kbn/core/server';
export interface BulkMarkApiKeysForInvalidationOpts {
    apiKeyIds: string[];
    logger: Logger;
    savedObjectsClient: SavedObjectsClientContract;
}
export declare const bulkMarkApiKeysForInvalidation: (opts: BulkMarkApiKeysForInvalidationOpts) => Promise<void>;
