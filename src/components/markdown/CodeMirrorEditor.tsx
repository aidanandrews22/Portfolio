import React, { useCallback, useEffect, useRef } from 'react';
import useCodeMirror from './useCodeMirror';
import './markdown.css';
import { EditorState } from '@codemirror/state';

interface Props {
  initialDoc: string;
  onChange: (doc: string) => void;
}

const CodeMirrorEditor: React.FC<Props> = (props) => {
  const { onChange, initialDoc } = props;
  const editorRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (state: EditorState) => {
      onChange(state.doc.toString());
    },
    [onChange]
  );

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      console.log('EditorView initialized');
      
      // Ensure the editor has focus
      editorView.focus();
      
      // Log when the editor gains or loses focus
      const focusHandler = () => console.log('Editor focused');
      const blurHandler = () => console.log('Editor blurred');
      editorView.dom.addEventListener('focus', focusHandler);
      editorView.dom.addEventListener('blur', blurHandler);

      return () => {
        editorView.dom.removeEventListener('focus', focusHandler);
        editorView.dom.removeEventListener('blur', blurHandler);
      };
    }
  }, [editorView]);

  return (
    <div 
      className='editor-wrapper' 
      ref={refContainer}
      onKeyDown={(e) => {
        console.log('Key pressed:', e.key);
        if (e.key === 'Tab') {
          e.preventDefault(); // Prevent default tab behavior
          console.log('Tab key pressed');
        }
      }}
    ></div>
  );
};

export default CodeMirrorEditor;