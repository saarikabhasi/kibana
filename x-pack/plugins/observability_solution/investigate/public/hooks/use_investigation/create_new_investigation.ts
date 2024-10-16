/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { AuthenticatedUser } from '@kbn/security-plugin/common';
import { v4 } from 'uuid';
import { i18n } from '@kbn/i18n';
import type { Investigation } from '../../../common';
import { GlobalWidgetParameters } from '../../../common/types';

export function createNewInvestigation({
  id,
  user,
  globalWidgetParameters,
}: {
  id?: string;
  user: AuthenticatedUser;
  globalWidgetParameters: GlobalWidgetParameters;
}): Investigation {
  return {
    createdAt: new Date().getTime(),
    user,
    id: id ?? v4(),
    title: i18n.translate('xpack.investigate.newInvestigationTitle', {
      defaultMessage: 'New investigation',
    }),
    items: [],
    notes: [],
    parameters: globalWidgetParameters,
  };
}
