/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useEffect, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { imageApi } from '~/api/axiosConfig';
interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
  setThumbnailUrl: React.Dispatch<React.SetStateAction<string>>;
  initialContent?: string;
}
export const TextEditor = ({ htmlStr, setHtmlStr, setThumbnailUrl }: IEditor) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const rendered = useRef(false);
  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;
    // const contentState = stateFromHTML(htmlStr as string);
    // console.log(contentState);
    const blocksFromHtml = htmlToDraft(htmlStr);
    // console.log(blocksFromHtml);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [htmlStr]);
  // useEffect(() => {
  //   if (initialContent) {
  //     const blocksFromHTML = convertFromHTML(initialContent);
  //     const contentState = ContentState.createFromBlockArray(
  //       blocksFromHTML.contentBlocks,
  //       blocksFromHTML.entityMap,
  //     );
  //     setEditorState(EditorState.createWithContent(contentState));
  //   }
  // }, [initialContent]);

  // const rendered = useRef(false);

  // useEffect(() => {
  //   const blocksFromHtml = htmlToDraft(htmlStr);
  //   if (blocksFromHtml) {
  //     const { contentBlocks, entityMap } = blocksFromHtml;
  //     const filteredEntityMap = Object.keys(entityMap)
  //       .filter((key) => entityMap[key] !== null)
  //       .reduce<MyObject>((newEntityMap, key) => {
  //         newEntityMap[key] = entityMap[key];
  //         return newEntityMap;
  //       }, {});
  //     const contentState = ContentState.createFromBlockArray(contentBlocks, filteredEntityMap);
  //     const editorState = EditorState.createWithContent(contentState);
  //     setEditorState(editorState);
  //   }
  // }, [htmlStr]);

  // useEffect(() => {
  //   const blocksFromHtml = htmlToDraft(htmlStr);
  //   if (blocksFromHtml) {
  //     const { contentBlocks, entityMap } = blocksFromHtml;
  //     const filteredEntityMap: MyObject = Object.keys(entityMap)
  //       .filter((key) => entityMap[key] !== null) // filter out null keys
  //       .reduce<MyObject>((obj, key) => {
  //         obj[key] = entityMap[key];
  //         return obj;
  //       }, {});
  //     const contentState = ContentState.createFromBlockArray(contentBlocks, filteredEntityMap);
  //     const editorState = EditorState.createWithContent(contentState);
  //     setEditorState(editorState);
  //   }
  // }, []);

  // editor 수정 이벤트
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setHtmlStr(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const uploadCallback = (file: Blob) => {
    return new Promise((resolve) => {
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
        // console.log(res);
        await setThumbnailUrl(res.data);
        resolve({ data: { link: res.data } });
      };

      reader.readAsDataURL(file);
    });
  };

  const toolbar = {
    options: ['inline', 'fontSize', 'list', 'textAlign', 'colorPicker', 'image'],
    image: { uploadCallback: uploadCallback, previewImage: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
  };

  return (
    <div className='' ref={editorRef}>
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
      <div dangerouslySetInnerHTML={{ __html: editorToHtml }} />
    </div>
  );
};
