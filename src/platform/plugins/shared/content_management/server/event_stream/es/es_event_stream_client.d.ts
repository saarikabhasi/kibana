import type { EsClient } from './types';
import type { EventStreamClient, EventStreamClientFilterOptions, EventStreamClientFilterResult, EventStreamEvent, EventStreamLogger } from '../types';
export interface EsEventStreamClientDependencies {
    baseName: string;
    kibanaVersion: string;
    logger: EventStreamLogger;
    esClient: Promise<EsClient>;
}
export declare class EsEventStreamClient implements EventStreamClient {
    #private;
    private readonly deps;
    constructor(deps: EsEventStreamClientDependencies);
    initialize(): Promise<void>;
    writeEvents(events: EventStreamEvent[]): Promise<void>;
    tail(limit?: number): Promise<EventStreamEvent[]>;
    filter(options: EventStreamClientFilterOptions): Promise<EventStreamClientFilterResult>;
}
