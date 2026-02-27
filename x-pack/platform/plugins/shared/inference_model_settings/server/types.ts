import type { FeaturesPluginSetup } from '@kbn/features-plugin/server';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InferenceModelSettingsPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InferenceModelSettingsPluginStart {}
export interface SearchInferenceModelSettingsPluginStartDependencies {
  features: FeaturesPluginSetup;
}
