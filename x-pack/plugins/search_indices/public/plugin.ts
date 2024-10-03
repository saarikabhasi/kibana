/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { CoreSetup, CoreStart, Plugin } from '@kbn/core/public';
import { i18n } from '@kbn/i18n';

import { docLinks } from '../common/doc_links';
import type {
  SearchIndicesAppPluginStartDependencies,
  SearchIndicesPluginSetup,
  SearchIndicesPluginStart,
  SearchIndicesServicesContextDeps,
} from './types';
import { initQueryClient } from './services/query_client';

export class SearchIndicesPlugin
  implements Plugin<SearchIndicesPluginSetup, SearchIndicesPluginStart>
{
  public setup(
    core: CoreSetup<SearchIndicesAppPluginStartDependencies, SearchIndicesPluginStart>
  ): SearchIndicesPluginSetup {
    const queryClient = initQueryClient(core.notifications.toasts);

    core.application.register({
      id: 'elasticsearchStart',
      appRoute: '/app/elasticsearch/start',
      title: i18n.translate('xpack.searchIndices.elasticsearchStart.startAppTitle', {
        defaultMessage: 'Elasticsearch Start',
      }),
      async mount({ element, history }) {
        const { renderApp } = await import('./application');
        const { ElasticsearchStartPage } = await import('./components/start/start_page');
        const [coreStart, depsStart] = await core.getStartServices();
        const startDeps: SearchIndicesServicesContextDeps = {
          ...depsStart,
          history,
        };
        return renderApp(ElasticsearchStartPage, coreStart, startDeps, element, queryClient);
      },
    });
    core.application.register({
      id: 'elasticsearchIndices',
      appRoute: '/app/elasticsearch/indices',
      title: i18n.translate('xpack.searchIndices.elasticsearchIndices.startAppTitle', {
        defaultMessage: 'Elasticsearch Indices',
      }),
      async mount({ element, history }) {
        const { renderApp } = await import('./application');
        const { SearchIndicesRouter } = await import('./components/indices/indices_router');
        const [coreStart, depsStart] = await core.getStartServices();
        const startDeps: SearchIndicesServicesContextDeps = {
          ...depsStart,
          history,
        };
        return renderApp(SearchIndicesRouter, coreStart, startDeps, element, queryClient);
      },
    });

    return {
      enabled: true,
    };
  }

  public start(
    core: CoreStart,
    deps: SearchIndicesAppPluginStartDependencies
  ): SearchIndicesPluginStart {
    const { indexManagement } = deps;
    docLinks.setDocLinks(core.docLinks.links);
    indexManagement?.extensionsService.setIndexDetailsPageRoute({
      renderRoute: () => {
        return '/app/elasticsearch/indices/index_details/';
      },
    });
    return {};
  }

  public stop() {}
}
