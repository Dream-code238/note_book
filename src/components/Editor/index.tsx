import { useEffect, useRef } from 'react';
import { AiEditor } from 'aieditor';

import { IEditorProps } from './interface';

import "aieditor/dist/style.css";

const Editor: React.FC<IEditorProps> = ({
  placeholder,
  defaultValue,
  onChange,
  options,
  ...otherParams
}) => {

  const editorRef = useRef(null);

  useEffect(
    () => {
      if (!editorRef.current) return;
    
      const aiEditor = new AiEditor({
        element: editorRef.current,
        placeholder,
        content: defaultValue,
        onChange: ed => {
          
          if (typeof onChange === "function") {
            onChange?.(ed.getHtml());
          }
        },
        ...options
      });

      return () => aiEditor.destroy();
    },
    [placeholder, defaultValue, options, onChange]
  );

  return <div ref={editorRef} {...otherParams} />;
}

export default Editor;