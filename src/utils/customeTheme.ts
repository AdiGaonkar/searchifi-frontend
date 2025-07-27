// customTheme.ts
import { HighlightStyle, tags as t } from '@codemirror/highlight';
import { EditorView } from '@codemirror/view';

export const customJsonHighlight = HighlightStyle.define([
  { tag: t.propertyName, color: '#3b82f6' }, // blue keys
  { tag: t.string, color: '#f97316' }, // orange values
]);

export const customTheme = EditorView.theme(
  {
    '&': {
      backgroundColor: '#0a0a0a',
      color: '#e5e5e5',
      borderRadius: '0.5rem',
    },
    '.cm-content': {
      fontFamily: 'monospace',
      fontSize: '14px',
      padding: '1rem',
    },
  },
  { dark: true }
);
