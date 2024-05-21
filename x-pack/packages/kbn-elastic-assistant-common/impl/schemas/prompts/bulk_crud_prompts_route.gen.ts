/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { z } from 'zod';

/*
 * NOTICE: Do not edit this file manually.
 * This file is automatically generated by the OpenAPI Generator, @kbn/openapi-generator.
 *
 * info:
 *   title: Bulk Actions API endpoint
 *   version: 2023-10-31
 */

import { NonEmptyString, User } from '../common_attributes.gen';

export type BulkActionSkipReason = z.infer<typeof BulkActionSkipReason>;
export const BulkActionSkipReason = z.literal('PROMPT_FIELD_NOT_MODIFIED');

export type BulkActionSkipResult = z.infer<typeof BulkActionSkipResult>;
export const BulkActionSkipResult = z.object({
  id: z.string(),
  name: z.string().optional(),
  skip_reason: BulkActionSkipReason,
});

export type PromptDetailsInError = z.infer<typeof PromptDetailsInError>;
export const PromptDetailsInError = z.object({
  id: z.string(),
  name: z.string().optional(),
});

export type NormalizedPromptError = z.infer<typeof NormalizedPromptError>;
export const NormalizedPromptError = z.object({
  message: z.string(),
  status_code: z.number().int(),
  err_code: z.string().optional(),
  prompts: z.array(PromptDetailsInError),
});

export type PromptResponse = z.infer<typeof PromptResponse>;
export const PromptResponse = z.object({
  id: NonEmptyString,
  timestamp: NonEmptyString.optional(),
  name: z.string(),
  promptType: z.string(),
  content: z.string(),
  isNewConversationDefault: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  isShared: z.boolean().optional(),
  updatedAt: z.string().optional(),
  updatedBy: z.string().optional(),
  createdAt: z.string().optional(),
  createdBy: z.string().optional(),
  users: z.array(User).optional(),
  /**
   * Kibana space
   */
  namespace: z.string().optional(),
});

export type BulkCrudActionResults = z.infer<typeof BulkCrudActionResults>;
export const BulkCrudActionResults = z.object({
  updated: z.array(PromptResponse),
  created: z.array(PromptResponse),
  deleted: z.array(z.string()),
  skipped: z.array(BulkActionSkipResult),
});

export type BulkCrudActionSummary = z.infer<typeof BulkCrudActionSummary>;
export const BulkCrudActionSummary = z.object({
  failed: z.number().int(),
  skipped: z.number().int(),
  succeeded: z.number().int(),
  total: z.number().int(),
});

export type BulkCrudActionResponse = z.infer<typeof BulkCrudActionResponse>;
export const BulkCrudActionResponse = z.object({
  success: z.boolean().optional(),
  status_code: z.number().int().optional(),
  message: z.string().optional(),
  prompts_count: z.number().int().optional(),
  attributes: z.object({
    results: BulkCrudActionResults,
    summary: BulkCrudActionSummary,
    errors: z.array(NormalizedPromptError).optional(),
  }),
});

export type BulkActionBase = z.infer<typeof BulkActionBase>;
export const BulkActionBase = z.object({
  /**
   * Query to filter promps
   */
  query: z.string().optional(),
  /**
   * Array of prompts IDs
   */
  ids: z.array(z.string()).min(1).optional(),
});

export type PromptCreateProps = z.infer<typeof PromptCreateProps>;
export const PromptCreateProps = z.object({
  name: z.string(),
  promptType: z.string(),
  content: z.string(),
  isNewConversationDefault: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  isShared: z.boolean().optional(),
});

export type PromptUpdateProps = z.infer<typeof PromptUpdateProps>;
export const PromptUpdateProps = z.object({
  id: z.string(),
  content: z.string().optional(),
  isNewConversationDefault: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  isShared: z.boolean().optional(),
});

export type PerformBulkActionRequestBody = z.infer<typeof PerformBulkActionRequestBody>;
export const PerformBulkActionRequestBody = z.object({
  delete: BulkActionBase.optional(),
  create: z.array(PromptCreateProps).optional(),
  update: z.array(PromptUpdateProps).optional(),
});
export type PerformBulkActionRequestBodyInput = z.input<typeof PerformBulkActionRequestBody>;

export type PerformBulkActionResponse = z.infer<typeof PerformBulkActionResponse>;
export const PerformBulkActionResponse = BulkCrudActionResponse;
