/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import {
  DEFAULT_APP_CATEGORIES,
  type AppMountParameters,
  type CoreSetup,
  type CoreStart,
  type Plugin,
} from '@kbn/core/public';
import type {
  AppPluginStartDependencies,
  SearchInferenceModelSettingsPluginSetup,
  SearchInferenceModelSettingsPluginStart,
  SearchInferenceModelSettingsSetupDependencies,
} from './types';

import { PLUGIN_NAME, PLUGIN_ID } from '../common/constants';

export class SearchInferenceModelSettingsPlugin
  implements
    Plugin<SearchInferenceModelSettingsPluginSetup, SearchInferenceModelSettingsPluginStart>
{
  public setup(
    core: CoreSetup,
    plugins: SearchInferenceModelSettingsSetupDependencies
  ): SearchInferenceModelSettingsPluginSetup {
    core.application.register({
      id: PLUGIN_ID,
      appRoute: '/app/elasticsearch/model_settings',
      visibleIn: ['globalSearch'],
      title: PLUGIN_NAME,
      async mount(params: AppMountParameters) {
        const { renderApp } = await import('./application');
        const [coreStart, depsStart] = await core.getStartServices();
        const startDeps: AppPluginStartDependencies = {
          ...depsStart,
          history: params.history,
        };
        return renderApp(coreStart, startDeps, params.element);
      },
    });

    plugins.management.sections.section.machineLearning.registerApp({
      id: PLUGIN_ID,
      title: PLUGIN_NAME,
      order: 50,
      async mount(params) {
        const { renderApp } = await import('./application');
        const [coreStart, depsStart] = await core.getStartServices();
        const startDeps: AppPluginStartDependencies = {
          ...depsStart,
          history: params.history
        };

        return renderApp(coreStart, startDeps, params.element);
      },
    });

    return {};
  }

  public start(core: CoreStart): SearchInferenceModelSettingsPluginStart {
    return {};
  }

  public stop() {}
}
