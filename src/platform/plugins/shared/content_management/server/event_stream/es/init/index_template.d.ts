import type { estypes } from '@elastic/elasticsearch';
export interface NewIndexTemplateRequestParams {
    name: string;
    indexPatterns: string[];
    kibanaVersion: string;
}
export declare const newIndexTemplateRequest: (params: NewIndexTemplateRequestParams) => estypes.IndicesPutIndexTemplateRequest;
