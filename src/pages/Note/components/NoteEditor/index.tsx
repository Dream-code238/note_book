import React from 'react';

import Editor from '../../../../components/Editor';

interface INoteEditorProps {
  value: string;
  onChange: (value: string) => void;
}


const NoteEditor: React.FC<Partial<INoteEditorProps>> = ({
  value,
  onChange
}) => {

  const handleUpdateEditor = (value: string) => {
    onChange?.(value);
  }

  const htmlText = (el: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = el;
    return temp.innerText || temp.textContent;
  }

  return (
    <Editor
      value={htmlText(value || '') || ''}
      placeholder='请输入内容'
      options={
        {
          theme: 'dark'
        }
      }
      onChange={handleUpdateEditor}
    />
  )
}

export default NoteEditor;