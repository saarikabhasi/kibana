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
 *   title: Bulk Delete API endpoint
 *   version: 2023-10-31
 */

import { z } from 'zod';

import { RuleObjectId, RuleSignatureId } from '../../../model/rule_schema/common_attributes.gen';
import { BulkCrudRulesResponse } from '../response_schema.gen';

export type BulkDeleteRulesRequestBody = z.infer<typeof BulkDeleteRulesRequestBody>;
export const BulkDeleteRulesRequestBody = z.array(
  z.object({
    id: RuleObjectId.optional(),
    rule_id: RuleSignatureId.optional(),
  })
);
export type BulkDeleteRulesRequestBodyInput = z.input<typeof BulkDeleteRulesRequestBody>;

export type BulkDeleteRulesResponse = z.infer<typeof BulkDeleteRulesResponse>;
export const BulkDeleteRulesResponse = BulkCrudRulesResponse;
