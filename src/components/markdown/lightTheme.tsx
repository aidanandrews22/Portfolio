import { EditorView } from '@codemirror/view';

export const lightTheme = EditorView.theme({
  '&': {
    color: 'black',
    backgroundColor: 'white',
    height: '100%'
  },
  '.cm-content': {
    caretColor: 'black'
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: 'black'
  },
  '&.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: '#d9d9d9'
  },
  '.cm-gutters': {
    backgroundColor: '#f5f5f5',
    color: '#333',
    borderRight: '1px solid #ddd'
  }
}, { dark: false });
