import type { CoreSetup } from '@kbn/core/server';
import type { EventStreamClient, EventStreamClientFactory, EventStreamLogger } from '../types';
export interface EsEventStreamClientFactoryDependencies {
    /**
     * The prefix used for index names. Usually `.kibana`, as Elasticsearch
     * treats indices starting with the `.kibana*` prefix as a special indices
     * that only Kibana should be allowed to access.
     */
    baseName: string;
    kibanaVersion: string;
    logger: EventStreamLogger;
}
export declare class EsEventStreamClientFactory implements EventStreamClientFactory {
    private readonly deps;
    constructor(deps: EsEventStreamClientFactoryDependencies);
    create(core: CoreSetup): EventStreamClient;
}
