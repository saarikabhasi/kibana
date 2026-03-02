/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import type { AppMountParameters, CoreStart } from '@kbn/core/public';
import type { ManagementSetup } from '@kbn/management-plugin/public';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InferenceModelSettingsPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InferenceModelSettingsPluginStart {}

export interface AppPluginStartDependencies {
  history: AppMountParameters['history'];
}
export interface InferenceModelSettingsSetupDependencies {
  management: ManagementSetup;
}
export type AppServicesContext = CoreStart & AppPluginStartDependencies;
