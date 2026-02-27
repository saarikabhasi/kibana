import {
  type PluginInitializerContext,
  type CoreSetup,
  type CoreStart,
  type Plugin,
  type Logger,
  DEFAULT_APP_CATEGORIES,
} from '@kbn/core/server';

import type {
  SearchInferenceModelSettingsPluginSetup,
  SearchInferenceModelSettingsPluginStart,
  SearchInferenceModelSettingsPluginStartDependencies,
} from './types';
// import { defineRoutes } from './routes';
import { PLUGIN_NAME, PLUGIN_ID, MANAGEMENT_APP_ID } from '../common/constants';

export class SearchInferenceModelSettingsPlugin
  implements Plugin<SearchInferenceModelSettingsPluginSetup, SearchInferenceModelSettingsPluginStart>
{
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup, plugins: SearchInferenceModelSettingsPluginStartDependencies) {
    this.logger.debug('SearchInferenceModelSettingsPlugin: Setup');

    plugins.features.registerKibanaFeature({
      id: PLUGIN_ID,
      minimumLicense: 'enterprise',
      name: PLUGIN_NAME,
      order: 2,
      category: DEFAULT_APP_CATEGORIES.enterpriseSearch,
      app: ['kibana', PLUGIN_ID],
      catalogue: [PLUGIN_ID],
      management: {
        ml: [MANAGEMENT_APP_ID],
      },
      privileges: {
        all: {
          app: ['kibana', PLUGIN_ID],
          api: [],
          catalogue: [PLUGIN_ID],
          management: {
            ml: [MANAGEMENT_APP_ID],
          },
          savedObject: {
            all: [],
            read: [],
          },
          ui: [],
        },
        read: {
          disabled: true,
          savedObject: {
            all: [],
            read: [],
          },
          ui: [],
        },
      },
    });

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('SearchInferenceModelSettingsPlugin: Started');
    return {};
  }

  public stop() {}
}
