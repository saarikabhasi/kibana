/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import type { AppMountParameters } from '@kbn/core/public';
import type { ManagementSetup } from '@kbn/management-plugin/public';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchInferenceModelSettingsPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchInferenceModelSettingsPluginStart {}

export interface AppPluginStartDependencies {
  history: AppMountParameters['history'];
}
export interface SearchInferenceModelSettingsSetupDependencies {
  management: ManagementSetup;
}
