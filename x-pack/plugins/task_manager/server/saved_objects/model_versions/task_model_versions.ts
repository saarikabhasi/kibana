/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { SavedObjectsModelVersionMap } from '@kbn/core-saved-objects-server';
import { taskSchemaV1, taskSchemaV2 } from '../schemas/task';

// IMPORTANT!!!
// When adding new model versions, make sure to manually test
// downgrading to the previous version. This is a gap in our
// automated test coverage so manual testing is needed.
export const taskModelVersions: SavedObjectsModelVersionMap = {
  '1': {
    changes: [
      {
        type: 'mappings_deprecation',
        deprecatedMappings: ['numSkippedRuns', 'interval'],
      },
    ],
    schemas: {
      forwardCompatibility: taskSchemaV1.extends({}, { unknowns: 'ignore' }),
      create: taskSchemaV1,
    },
  },
  '2': {
    changes: [
      {
        type: 'mappings_addition',
        addedMappings: {
          partition: { type: 'integer' },
        },
      },
    ],
    schemas: {
      forwardCompatibility: taskSchemaV2.extends({}, { unknowns: 'ignore' }),
      create: taskSchemaV2,
    },
  },
};
