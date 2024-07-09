/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/*
 * NOTICE: Do not edit this file manually.
 * This file is automatically generated by the OpenAPI Generator, @kbn/openapi-generator.
 *
 * info:
 *   title: Read Saved Queries Schema
 *   version: 2023-10-31
 */

import { z } from 'zod';

import { SavedQueryId } from '../model/schema/common_attributes.gen';

export type ReadSavedQueryRequestQuery = z.infer<typeof ReadSavedQueryRequestQuery>;
export const ReadSavedQueryRequestQuery = z.object({
  id: SavedQueryId.optional(),
});
