import type { PluginInitializerContext } from '@kbn/core/server';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export async function plugin(initializerContext: PluginInitializerContext) {
  const { InferenceModelSettingsPlugin } = await import('./plugin');
  return new InferenceModelSettingsPlugin(initializerContext);
}

export type { InferenceModelSettingsPluginSetup, InferenceModelSettingsPluginStart } from './types';
