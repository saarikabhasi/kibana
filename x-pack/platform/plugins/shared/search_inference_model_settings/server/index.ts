import type { PluginInitializerContext } from '@kbn/core/server';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export async function plugin(initializerContext: PluginInitializerContext) {
  const { SearchInferenceModelSettingsPlugin } = await import('./plugin');
  return new SearchInferenceModelSettingsPlugin(initializerContext);
}

export type { SearchInferenceModelSettingsPluginSetup, SearchInferenceModelSettingsPluginStart } from './types';
