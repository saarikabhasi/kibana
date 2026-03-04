import React from 'react';
import type { CodeEditorProps } from './code_editor';
export type { CodeEditorProps } from './code_editor';
export { monaco } from '@kbn/monaco';
export * from './react_monaco_editor/languages/supported';
/**
 * Renders a Monaco code editor with EUI color theme.
 *
 * @see CodeEditorField to render a code editor in the same style as other EUI form fields.
 */
export declare const CodeEditor: React.FunctionComponent<CodeEditorProps>;
/**
 * Renders a Monaco code editor in the same style as other EUI form fields.
 */
export declare const CodeEditorField: React.FunctionComponent<CodeEditorProps>;
