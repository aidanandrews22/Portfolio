import { useEffect, useState, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { indentOnInput, bracketMatching, syntaxHighlighting, defaultHighlightStyle, HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { lightTheme } from './lightTheme';
import type React from 'react';

export const transparentTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    height: '100%',
  },
});

const customSyntaxHighlighting = HighlightStyle.define([
  { tag: tags.heading1, fontSize: '1.6em', fontWeight: 'bold' },
  { tag: tags.heading2, fontSize: '1.4em', fontWeight: 'bold' },
  { tag: tags.heading3, fontSize: '1.2em', fontWeight: 'bold' },
]);

interface Props {
  initialDoc: string;
  onChange?: (state: EditorState) => void;
}

const useCodeMirror = <T extends Element>(props: Props): [React.RefObject<T>, EditorView | undefined] => {
  const refContainer = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();
  const { onChange } = props;

  useEffect(() => {
    if (!refContainer.current) return;

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        history(),
        indentOnInput(),
        bracketMatching(),
        syntaxHighlighting(defaultHighlightStyle),
        syntaxHighlighting(customSyntaxHighlighting),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        lightTheme,
        transparentTheme,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            console.log('Document changed');
            onChange(update.state);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });
    setEditorView(view);

    return () => {
      console.log('Destroying editor view');
      view.destroy();
    };
  }, [refContainer, props.initialDoc, onChange]);

  return [refContainer, editorView];
};

export default useCodeMirror;