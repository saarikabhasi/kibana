import type { FeaturesPluginSetup } from '@kbn/features-plugin/server';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchInferenceModelSettingsPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchInferenceModelSettingsPluginStart {}
export interface SearchInferenceModelSettingsPluginStartDependencies {
  features: FeaturesPluginSetup;
}
