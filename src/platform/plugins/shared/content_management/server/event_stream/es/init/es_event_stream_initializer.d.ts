import type { EsClient } from '../types';
import type { EsEventStreamNames } from '../es_event_stream_names';
import type { EventStreamLogger } from '../../types';
export interface EsEventStreamInitializerDependencies {
    names: EsEventStreamNames;
    kibanaVersion: string;
    logger: EventStreamLogger;
    esClient: Promise<EsClient>;
}
export declare class EsEventStreamInitializer {
    #private;
    private readonly deps;
    constructor(deps: EsEventStreamInitializerDependencies);
    initialize(): Promise<void>;
    protected readonly createIndexTemplateIfNotExists: () => Promise<boolean>;
    protected indexTemplateExists(): Promise<boolean>;
    protected createIndexTemplate(): Promise<boolean>;
    protected readonly createDataStream: () => Promise<void>;
}
