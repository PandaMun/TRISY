import { Editor } from 'react-draft-wysiwyg';

export const TextEditor = () => {
  return (
    <Editor
      wrapperClassName='wrapper-class'
      editorClassName='editor-class'
      toolbarClassName='toolbar-class'
    />
  );
};
