/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/*
 * NOTICE: Do not edit this file manually.
 * This file is automatically generated by the OpenAPI Generator, @kbn/openapi-generator.
 *
 * info:
 *   title: API client for tests
 *   version: Bundle (no version)
 */

import {
  ELASTIC_HTTP_VERSION_HEADER,
  X_ELASTIC_INTERNAL_ORIGIN_REQUEST,
} from '@kbn/core-http-common';
import { replaceParams } from '@kbn/openapi-common/shared';

import { GetAgentDetailsRequestParamsInput } from '@kbn/osquery-plugin/common/api/fleet_wrapper/fleet_wrapper.gen';
import { GetAgentPolicyRequestParamsInput } from '@kbn/osquery-plugin/common/api/fleet_wrapper/fleet_wrapper.gen';
import { GetAgentsRequestQueryInput } from '@kbn/osquery-plugin/common/api/fleet_wrapper/fleet_wrapper.gen';
import { OsqueryCreateLiveQueryRequestBodyInput } from '@kbn/osquery-plugin/common/api/live_query/live_queries.gen';
import { OsqueryCreatePacksRequestBodyInput } from '@kbn/osquery-plugin/common/api/packs/packs.gen';
import { OsqueryCreateSavedQueryRequestBodyInput } from '@kbn/osquery-plugin/common/api/saved_query/saved_query.gen';
import { OsqueryDeletePacksRequestParamsInput } from '@kbn/osquery-plugin/common/api/packs/packs.gen';
import { OsqueryDeleteSavedQueryRequestParamsInput } from '@kbn/osquery-plugin/common/api/saved_query/saved_query.gen';
import { OsqueryFindLiveQueriesRequestQueryInput } from '@kbn/osquery-plugin/common/api/live_query/live_queries.gen';
import { OsqueryFindPacksRequestQueryInput } from '@kbn/osquery-plugin/common/api/packs/packs.gen';
import { OsqueryFindSavedQueriesRequestQueryInput } from '@kbn/osquery-plugin/common/api/saved_query/saved_query.gen';
import { OsqueryGetLiveQueryDetailsRequestParamsInput } from '@kbn/osquery-plugin/common/api/live_query/live_queries.gen';
import {
  OsqueryGetLiveQueryResultsRequestQueryInput,
  OsqueryGetLiveQueryResultsRequestParamsInput,
} from '@kbn/osquery-plugin/common/api/live_query/live_queries.gen';
import { OsqueryGetPacksDetailsRequestParamsInput } from '@kbn/osquery-plugin/common/api/packs/packs.gen';
import { OsqueryGetSavedQueryDetailsRequestParamsInput } from '@kbn/osquery-plugin/common/api/saved_query/saved_query.gen';
import {
  OsqueryUpdatePacksRequestParamsInput,
  OsqueryUpdatePacksRequestBodyInput,
} from '@kbn/osquery-plugin/common/api/packs/packs.gen';
import {
  OsqueryUpdateSavedQueryRequestParamsInput,
  OsqueryUpdateSavedQueryRequestBodyInput,
} from '@kbn/osquery-plugin/common/api/saved_query/saved_query.gen';
import { ReadAssetsStatusRequestQueryInput } from '@kbn/osquery-plugin/common/api/asset/assets.gen';
import { UpdateAssetsStatusRequestQueryInput } from '@kbn/osquery-plugin/common/api/asset/assets.gen';
import { routeWithNamespace } from '../../common/utils/security_solution';
import { FtrProviderContext } from '../ftr_provider_context';

export function SecuritySolutionApiProvider({ getService }: FtrProviderContext) {
  const supertest = getService('supertest');

  return {
    getAgentDetails(props: GetAgentDetailsProps, kibanaSpace: string = 'default') {
      return supertest
        .get(
          routeWithNamespace(
            replaceParams('/internal/osquery/fleet_wrapper/agents/{id}', props.params),
            kibanaSpace
          )
        )
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana');
    },
    getAgentPackagePolicies(kibanaSpace: string = 'default') {
      return supertest
        .get(routeWithNamespace('/internal/osquery/fleet_wrapper/package_policies', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana');
    },
    getAgentPolicies(kibanaSpace: string = 'default') {
      return supertest
        .get(routeWithNamespace('/internal/osquery/fleet_wrapper/agent_policies', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana');
    },
    getAgentPolicy(props: GetAgentPolicyProps, kibanaSpace: string = 'default') {
      return supertest
        .get(
          routeWithNamespace(
            replaceParams('/internal/osquery/fleet_wrapper/agent_policies/{id}', props.params),
            kibanaSpace
          )
        )
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana');
    },
    getAgents(props: GetAgentsProps, kibanaSpace: string = 'default') {
      return supertest
        .get(routeWithNamespace('/internal/osquery/fleet_wrapper/agents', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .query(props.query);
    },
    /**
     * Create and run a live query.
     */
    osqueryCreateLiveQuery(props: OsqueryCreateLiveQueryProps, kibanaSpace: string = 'default') {
      return supertest
        .post(routeWithNamespace('/api/osquery/live_queries', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .send(props.body as object);
    },
    /**
     * Create a query pack.
     */
    osqueryCreatePacks(props: OsqueryCreatePacksProps, kibanaSpace: string = 'default') {
      return supertest
        .post(routeWithNamespace('/api/osquery/packs', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .send(props.body as object);
    },
    /**
     * Create and run a saved query.
     */
    osqueryCreateSavedQuery(props: OsqueryCreateSavedQueryProps, kibanaSpace: string = 'default') {
      return supertest
        .post(routeWithNamespace('/api/osquery/saved_queries', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .send(props.body as object);
    },
    /**
     * Delete a query pack using the pack ID.
     */
    osqueryDeletePacks(props: OsqueryDeletePacksProps, kibanaSpace: string = 'default') {
      return supertest
        .delete(
          routeWithNamespace(replaceParams('/api/osquery/packs/{id}', props.params), kibanaSpace)
        )
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana');
    },
    /**
     * Delete a saved query using the query ID.
     */
    osqueryDeleteSavedQuery(props: OsqueryDeleteSavedQueryProps, kibanaSpace: string = 'default') {
      return supertest
        .delete(
          routeWithNamespace(
            replaceParams('/api/osquery/saved_queries/{id}', props.params),
            kibanaSpace
          )
        )
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana');
    },
    /**
     * Get a list of all live queries.
     */
    osqueryFindLiveQueries(props: OsqueryFindLiveQueriesProps, kibanaSpace: string = 'default') {
      return supertest
        .get(routeWithNamespace('/api/osquery/live_queries', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .query(props.query);
    },
    /**
     * Get a list of all query packs.
     */
    osqueryFindPacks(props: OsqueryFindPacksProps, kibanaSpace: string = 'default') {
      return supertest
        .get(routeWithNamespace('/api/osquery/packs', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .query(props.query);
    },
    /**
     * Get a list of all saved queries.
     */
    osqueryFindSavedQueries(props: OsqueryFindSavedQueriesProps, kibanaSpace: string = 'default') {
      return supertest
        .get(routeWithNamespace('/api/osquery/saved_queries', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .query(props.query);
    },
    /**
     * Get the details of a live query using the query ID.
     */
    osqueryGetLiveQueryDetails(
      props: OsqueryGetLiveQueryDetailsProps,
      kibanaSpace: string = 'default'
    ) {
      return supertest
        .get(
          routeWithNamespace(
            replaceParams('/api/osquery/live_queries/{id}', props.params),
            kibanaSpace
          )
        )
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana');
    },
    /**
     * Get the results of a live query using the query action ID.
     */
    osqueryGetLiveQueryResults(
      props: OsqueryGetLiveQueryResultsProps,
      kibanaSpace: string = 'default'
    ) {
      return supertest
        .get(
          routeWithNamespace(
            replaceParams('/api/osquery/live_queries/{id}/results/{actionId}', props.params),
            kibanaSpace
          )
        )
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .query(props.query);
    },
    /**
     * Get the details of a query pack using the pack ID.
     */
    osqueryGetPacksDetails(props: OsqueryGetPacksDetailsProps, kibanaSpace: string = 'default') {
      return supertest
        .get(
          routeWithNamespace(replaceParams('/api/osquery/packs/{id}', props.params), kibanaSpace)
        )
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana');
    },
    /**
     * Get the details of a saved query using the query ID.
     */
    osqueryGetSavedQueryDetails(
      props: OsqueryGetSavedQueryDetailsProps,
      kibanaSpace: string = 'default'
    ) {
      return supertest
        .get(
          routeWithNamespace(
            replaceParams('/api/osquery/saved_queries/{id}', props.params),
            kibanaSpace
          )
        )
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana');
    },
    /**
      * Update a query pack using the pack ID.
> info
> You cannot update a prebuilt pack.

      */
    osqueryUpdatePacks(props: OsqueryUpdatePacksProps, kibanaSpace: string = 'default') {
      return supertest
        .put(
          routeWithNamespace(replaceParams('/api/osquery/packs/{id}', props.params), kibanaSpace)
        )
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .send(props.body as object);
    },
    /**
      * Update a saved query using the query ID.
> info
> You cannot update a prebuilt saved query.

      */
    osqueryUpdateSavedQuery(props: OsqueryUpdateSavedQueryProps, kibanaSpace: string = 'default') {
      return supertest
        .put(
          routeWithNamespace(
            replaceParams('/api/osquery/saved_queries/{id}', props.params),
            kibanaSpace
          )
        )
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '2023-10-31')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .send(props.body as object);
    },
    readAssetsStatus(props: ReadAssetsStatusProps, kibanaSpace: string = 'default') {
      return supertest
        .get(routeWithNamespace('/internal/osquery/assets', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .query(props.query);
    },
    readInstallationStatus(kibanaSpace: string = 'default') {
      return supertest
        .get(routeWithNamespace('/internal/osquery/status', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana');
    },
    readPrivilegesCheck(kibanaSpace: string = 'default') {
      return supertest
        .get(routeWithNamespace('/internal/osquery/privileges_check', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana');
    },
    updateAssetsStatus(props: UpdateAssetsStatusProps, kibanaSpace: string = 'default') {
      return supertest
        .post(routeWithNamespace('/internal/osquery/assets/update', kibanaSpace))
        .set('kbn-xsrf', 'true')
        .set(ELASTIC_HTTP_VERSION_HEADER, '1')
        .set(X_ELASTIC_INTERNAL_ORIGIN_REQUEST, 'kibana')
        .query(props.query);
    },
  };
}

export interface GetAgentDetailsProps {
  params: GetAgentDetailsRequestParamsInput;
}
export interface GetAgentPolicyProps {
  params: GetAgentPolicyRequestParamsInput;
}
export interface GetAgentsProps {
  query: GetAgentsRequestQueryInput;
}
export interface OsqueryCreateLiveQueryProps {
  body: OsqueryCreateLiveQueryRequestBodyInput;
}
export interface OsqueryCreatePacksProps {
  body: OsqueryCreatePacksRequestBodyInput;
}
export interface OsqueryCreateSavedQueryProps {
  body: OsqueryCreateSavedQueryRequestBodyInput;
}
export interface OsqueryDeletePacksProps {
  params: OsqueryDeletePacksRequestParamsInput;
}
export interface OsqueryDeleteSavedQueryProps {
  params: OsqueryDeleteSavedQueryRequestParamsInput;
}
export interface OsqueryFindLiveQueriesProps {
  query: OsqueryFindLiveQueriesRequestQueryInput;
}
export interface OsqueryFindPacksProps {
  query: OsqueryFindPacksRequestQueryInput;
}
export interface OsqueryFindSavedQueriesProps {
  query: OsqueryFindSavedQueriesRequestQueryInput;
}
export interface OsqueryGetLiveQueryDetailsProps {
  params: OsqueryGetLiveQueryDetailsRequestParamsInput;
}
export interface OsqueryGetLiveQueryResultsProps {
  query: OsqueryGetLiveQueryResultsRequestQueryInput;
  params: OsqueryGetLiveQueryResultsRequestParamsInput;
}
export interface OsqueryGetPacksDetailsProps {
  params: OsqueryGetPacksDetailsRequestParamsInput;
}
export interface OsqueryGetSavedQueryDetailsProps {
  params: OsqueryGetSavedQueryDetailsRequestParamsInput;
}
export interface OsqueryUpdatePacksProps {
  params: OsqueryUpdatePacksRequestParamsInput;
  body: OsqueryUpdatePacksRequestBodyInput;
}
export interface OsqueryUpdateSavedQueryProps {
  params: OsqueryUpdateSavedQueryRequestParamsInput;
  body: OsqueryUpdateSavedQueryRequestBodyInput;
}
export interface ReadAssetsStatusProps {
  query: ReadAssetsStatusRequestQueryInput;
}
export interface UpdateAssetsStatusProps {
  query: UpdateAssetsStatusRequestQueryInput;
}
