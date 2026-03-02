import type { PluginInitializerContext } from '@kbn/core/server';
import { InferenceModelSettingsPlugin } from './plugin';
export { config } from './config';
//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export async function plugin(initializerContext: PluginInitializerContext) {
  return new InferenceModelSettingsPlugin(initializerContext);
}

export type { InferenceModelSettingsPluginSetup, InferenceModelSettingsPluginStart } from './types';
