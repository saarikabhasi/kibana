/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { FtrProviderContext } from '../../ftr_provider_context';

export default ({ loadTestFile }: FtrProviderContext) => {
  describe('Ingest pipelines app', function () {
    loadTestFile(require.resolve('./feature_controls'));
    loadTestFile(require.resolve('./ingest_pipelines'));
    loadTestFile(require.resolve('./manage_processors'));
  });
};
