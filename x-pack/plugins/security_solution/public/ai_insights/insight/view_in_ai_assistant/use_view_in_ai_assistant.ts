/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { useMemo, useCallback } from 'react';
import { useAssistantOverlay } from '@kbn/elastic-assistant';
import type { Replacements } from '@kbn/elastic-assistant-common';
import { useAssistantAvailability } from '../../../assistant/use_assistant_availability';
import { getAlertsInsightMarkdown } from '../../get_alerts_insight_markdown/get_alerts_insight_markdown';
import type { AlertsInsight } from '../../types';

const useAssistantNoop = () => ({ promptContextId: undefined, showAssistantOverlay: () => {} });

/**
 * This category is provided in the prompt context for the assistant
 */
const category = 'insight';
export const useViewInAiAssistant = ({
  insight,
  replacements,
}: {
  insight: AlertsInsight;
  replacements?: Replacements;
}) => {
  const { hasAssistantPrivilege } = useAssistantAvailability();

  const useAssistantHook = useMemo(
    () => (hasAssistantPrivilege ? useAssistantOverlay : useAssistantNoop),
    [hasAssistantPrivilege]
  );

  // the prompt context for this insight:
  const getPromptContext = useCallback(
    async () =>
      getAlertsInsightMarkdown({
        insight,
        // note: we do NOT want to replace the replacements here
      }),
    [insight]
  );
  const { promptContextId, showAssistantOverlay: showOverlay } = useAssistantHook(
    category,
    insight.title, // conversation title
    insight.title, // description used in context pill
    getPromptContext,
    insight.id, // accept the UUID default for this prompt context
    null, // suggestedUserPrompt
    null, // tooltip
    replacements ?? null
  );

  // proxy show / hide calls to assistant context, using our internal prompt context id:
  const showAssistantOverlay = useCallback(() => {
    showOverlay(true, true);
  }, [showOverlay]);

  const disabled = !hasAssistantPrivilege || promptContextId == null;

  return useMemo(
    () => ({ promptContextId, disabled, showAssistantOverlay }),
    [promptContextId, disabled, showAssistantOverlay]
  );
};
