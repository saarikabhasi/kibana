/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import type { CoreStart } from '@kbn/core/public';
import React from 'react';
import ReactDOM from 'react-dom';
import { KibanaContextProvider } from '@kbn/kibana-react-plugin/public';
import { I18nProvider } from '@kbn/i18n-react';
import { Router, Routes } from '@kbn/shared-ux-router';
import { Route } from 'react-router-dom';
import type { AppPluginStartDependencies } from './types';
import { ModelSettingsApp } from './components/model_settings';

export const renderApp = (
  core: CoreStart,
  services: AppPluginStartDependencies,
  element: HTMLElement
) => {
  ReactDOM.render(
    <KibanaContextProvider services={{ ...core, ...services }}>
      <I18nProvider>
        <Router history={services.history}>
          <Routes>
            <Route path={'/'}>
              <ModelSettingsApp />
            </Route>
          </Routes>
        </Router>
      </I18nProvider>
    </KibanaContextProvider>,
    element
  );

  return () => {
    ReactDOM.unmountComponentAtNode(element);
  };
};
