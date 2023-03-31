import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { imageApi } from '~/api/axiosConfig';

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
}

export const TextEditor = ({ htmlStr, setHtmlStr }: IEditor) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlStr);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const filteredEntityMap = Object.keys(entityMap)
        .filter((key) => entityMap[key] !== null) // filter out null keys
        .reduce((obj, key) => {
          obj[key] = entityMap[key];
          return obj;
        }, {});
      const contentState = ContentState.createFromBlockArray(contentBlocks, filteredEntityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, []);

  // editor 수정 이벤트
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setHtmlStr(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const uploadCallback = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log(file);
      reader.onloadend = async () => {
        //   const formData = new FormData();
        //   await formData.append('multipartFiles', file);
        //   await console.log(formData);
        const paylaod = {
          file: file,
        };
        const res = await imageApi.post('board/image', paylaod);
        console.log(res);
        resolve({ data: { link: res.data } });
      };

      reader.readAsDataURL(file);
    });
  };
  // toolbar 설정
  const toolbar = {
    options: ['inline', 'fontSize', 'list', 'textAlign', 'colorPicker', 'image'],
    image: { uploadCallback: uploadCallback }, // 이미지 커스텀 업로드
    list: { inDropdown: true }, // list 드롭다운
    textAlign: { inDropdown: true }, // align 드롭다운
    // link: { inDropdown: true }, // link 드롭다운
    history: { inDropdown: false }, // history 드롭다운
  };

  return (
    <div className=''>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        placeholder='내용을 작성해주세요.'
        wrapperClassName='wrapper-class'
        editorClassName='editor-class'
        toolbarClassName='toolbar-class'
        localization={{
          locale: 'ko',
        }}
        toolbar={toolbar}
      />
    </div>
  );
};
