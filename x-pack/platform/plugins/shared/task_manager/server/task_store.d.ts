import { Subject } from 'rxjs';
import type { SavedObjectError } from '@kbn/core-saved-objects-common';
import type { estypes } from '@elastic/elasticsearch';
import type { SavedObjectsBulkDeleteResponse, Logger, SavedObjectsServiceStart, SecurityServiceStart, SavedObject, ISavedObjectsSerializer, ISavedObjectsRepository, ElasticsearchClient } from '@kbn/core/server';
import type { EncryptedSavedObjectsClient } from '@kbn/encrypted-saved-objects-shared';
import type { IBasePath } from '@kbn/core/server';
import type { RequestTimeoutsConfig } from './config';
import type { Result } from './lib/result_type';
import type { ConcreteTaskInstance, ConcreteTaskInstanceVersion, TaskInstance, TaskLifecycle, SerializedConcreteTaskInstance, PartialConcreteTaskInstance, PartialSerializedConcreteTaskInstance, ApiKeyOptions } from './task';
import type { TaskTypeDictionary } from './task_type_dictionary';
import type { AdHocTaskCounter } from './lib/adhoc_task_counter';
import { TaskValidator } from './task_validator';
import type { ErrorOutput } from './lib/bulk_operation_buffer';
export interface StoreOpts {
    esClient: ElasticsearchClient;
    index: string;
    taskManagerId: string;
    definitions: TaskTypeDictionary;
    savedObjectsRepository: ISavedObjectsRepository;
    savedObjectsService: SavedObjectsServiceStart;
    serializer: ISavedObjectsSerializer;
    adHocTaskCounter: AdHocTaskCounter;
    allowReadingInvalidState: boolean;
    logger: Logger;
    requestTimeouts: RequestTimeoutsConfig;
    security: SecurityServiceStart;
    canEncryptSavedObjects?: boolean;
    esoClient?: EncryptedSavedObjectsClient;
    getIsSecurityEnabled: () => boolean;
    basePath: IBasePath;
}
export interface SearchOpts {
    search_after?: Array<number | string>;
    size?: number;
    sort?: estypes.Sort;
    query?: estypes.QueryDslQueryContainer;
    seq_no_primary_term?: boolean;
}
export interface AggregationOpts {
    aggs: Record<string, estypes.AggregationsAggregationContainer>;
    query?: estypes.QueryDslQueryContainer;
    runtime_mappings?: estypes.MappingRuntimeFields;
    size?: number;
}
export interface UpdateByQuerySearchOpts extends SearchOpts {
    script?: estypes.Script;
}
export interface UpdateByQueryOpts extends SearchOpts {
    max_docs?: number;
}
export interface FetchResult {
    docs: ConcreteTaskInstance[];
    versionMap: Map<string, ConcreteTaskInstanceVersion>;
}
export interface BulkUpdateOpts {
    validate: boolean;
    mergeAttributes?: boolean;
    options?: ApiKeyOptions;
}
export type BulkUpdateResult = Result<ConcreteTaskInstance, ErrorOutput>;
export type PartialBulkUpdateResult = Result<PartialConcreteTaskInstance, ErrorOutput>;
export type BulkGetResult = Array<Result<ConcreteTaskInstance, {
    type: string;
    id: string;
    error: SavedObjectError;
}>>;
export interface UpdateByQueryResult {
    updated: number;
    version_conflicts: number;
    total: number;
}
/**
 * Wraps an elasticsearch connection and provides a task manager-specific
 * interface into the index.
 */
export declare class TaskStore {
    readonly index: string;
    readonly taskManagerId: string;
    readonly errors$: Subject<Error>;
    readonly taskValidator: TaskValidator;
    private esClient;
    private esoClient?;
    private definitions;
    private savedObjectsRepository;
    private savedObjectsService;
    private serializer;
    private adHocTaskCounter;
    private requestTimeouts;
    private security;
    private canEncryptSavedObjects?;
    private getIsSecurityEnabled;
    private logger;
    private basePath;
    /**
     * Constructs a new TaskStore.
     * @param {StoreOpts} opts
     * @prop {esClient} esClient - An elasticsearch client
     * @prop {string} index - The name of the task manager index
     * @prop {TaskDefinition} definition - The definition of the task being run
     * @prop {serializer} - The saved object serializer
     * @prop {savedObjectsRepository} - An instance to the saved objects repository
     */
    constructor(opts: StoreOpts);
    registerEncryptedSavedObjectsClient(client: EncryptedSavedObjectsClient): void;
    private canEncryptSo;
    private validateCanEncryptSavedObjects;
    private getSoClientForCreate;
    private regenerateApiKeyFromRequest;
    private getSoClientForUpdate;
    private getApiKeyFromRequest;
    private bulkGetDecryptedTaskApiKeys;
    private bulkGetAndMergeTasksWithDecryptedApiKey;
    /**
     * Convert ConcreteTaskInstance Ids to match their SavedObject format as serialized
     * in Elasticsearch
     * @param tasks - The task being scheduled.
     */
    convertToSavedObjectIds(taskIds: Array<ConcreteTaskInstance['id']>): Array<ConcreteTaskInstance['id']>;
    /**
     * Schedules a task.
     *
     * @param task - The task being scheduled.
     */
    schedule(taskInstance: TaskInstance, options?: ApiKeyOptions): Promise<ConcreteTaskInstance>;
    /**
     * Bulk schedules a task.
     *
     * @param tasks - The tasks being scheduled.
     */
    bulkSchedule(taskInstances: TaskInstance[], options?: ApiKeyOptions): Promise<ConcreteTaskInstance[]>;
    /**
     * Fetches a list of scheduled tasks with default sorting.
     *
     * @param opts - The query options used to filter tasks
     * @param limitResponse - Whether to exclude the task state and params from the source for a smaller respose payload
     */
    fetch({ sort, ...opts }?: SearchOpts, limitResponse?: boolean): Promise<FetchResult>;
    /**
     * Updates the specified doc in the index, returning the doc
     * with its version up to date.
     *
     * @param {TaskDoc} doc
     * @returns {Promise<TaskDoc>}
     */
    update(doc: ConcreteTaskInstance, options: {
        validate: boolean;
    }): Promise<ConcreteTaskInstance>;
    /**
     * Updates the specified docs in the index, returning the docs
     * with their versions up to date.
     *
     * @param {Array<TaskDoc>} docs
     * @returns {Promise<Array<TaskDoc>>}
     */
    bulkUpdate(docs: ConcreteTaskInstance[], { validate, mergeAttributes, options }: BulkUpdateOpts): Promise<BulkUpdateResult[]>;
    bulkPartialUpdate(docs: PartialConcreteTaskInstance[]): Promise<PartialBulkUpdateResult[]>;
    /**
     * Removes the specified task from the index.
     *
     * @param {string} id
     * @returns {Promise<void>}
     */
    remove(id: string): Promise<void>;
    /**
     * Bulk removes the specified tasks from the index.
     *
     * @param {SavedObjectsBulkDeleteObject[]} savedObjectsToDelete
     * @returns {Promise<SavedObjectsBulkDeleteResponse>}
     */
    bulkRemove(taskIds: string[]): Promise<SavedObjectsBulkDeleteResponse>;
    /**
     * Gets a task by id
     *
     * @param {string} id
     * @returns {Promise<void>}
     */
    get(id: string): Promise<ConcreteTaskInstance>;
    /**
     * Gets tasks by ids
     *
     * @param {Array<string>} ids
     * @returns {Promise<ConcreteTaskInstance[]>}
     */
    bulkGet(ids: string[]): Promise<BulkGetResult>;
    /**
     * Gets task version info by ids
     *
     * @param {Array<string>} esIds
     * @returns {Promise<ConcreteTaskInstance[]>}
     */
    bulkGetVersions(ids: string[]): Promise<ConcreteTaskInstanceVersion[]>;
    /**
     * Gets task lifecycle step by id
     *
     * @param {string} id
     * @returns {Promise<void>}
     */
    getLifecycle(id: string): Promise<TaskLifecycle>;
    msearch(opts?: SearchOpts[]): Promise<FetchResult>;
    private search;
    private filterTasks;
    private addTasksToVersionMap;
    private createVersionMap;
    aggregate<TSearchRequest extends AggregationOpts>({ aggs, query, runtime_mappings, size, }: TSearchRequest): Promise<estypes.SearchResponse<ConcreteTaskInstance>>;
    updateByQuery(opts?: UpdateByQuerySearchOpts, { max_docs: max_docs }?: UpdateByQueryOpts): Promise<UpdateByQueryResult>;
    getDocVersions(esIds: string[]): Promise<Map<string, ConcreteTaskInstanceVersion>>;
}
/**
 * When we run updateByQuery with conflicts='proceed', it's possible for the `version_conflicts`
 * to count against the specified `max_docs`, as per https://github.com/elastic/elasticsearch/issues/63671
 * In order to correct for that happening, we only count `version_conflicts` if we haven't updated as
 * many docs as we could have.
 * This is still no more than an estimation, as there might have been less docuemnt to update that the
 * `max_docs`, but we bias in favour of over zealous `version_conflicts` as that's the best indicator we
 * have for an unhealthy cluster distribution of Task Manager polling intervals
 */
export declare function correctVersionConflictsForContinuation(updated: estypes.ReindexResponse['updated'], versionConflicts: estypes.ReindexResponse['version_conflicts'], maxDocs?: number): number;
export declare function taskInstanceToAttributes(doc: TaskInstance, id: string): SerializedConcreteTaskInstance;
export declare function partialTaskInstanceToAttributes(doc: PartialConcreteTaskInstance): PartialSerializedConcreteTaskInstance;
export declare function savedObjectToConcreteTaskInstance(savedObject: Omit<SavedObject<SerializedConcreteTaskInstance>, 'references'>): ConcreteTaskInstance;
