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
import { useParams } from 'react-router-dom';
import { getBoardById } from '~/api/boardApi';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '~/components/Shared/Spinner';

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
  setThumbnailUrl: React.Dispatch<React.SetStateAction<string>>;
  initialContent?: string;
}

export const UpdateEditor = ({ htmlStr, setHtmlStr, setThumbnailUrl }: IEditor) => {
  const { id } = useParams<{ id: string }>();
  const { data: postDetails, isLoading } = useQuery(['post', id], () => getBoardById(id as string));
  // console.log(postDetails);
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const rendered = useRef(false);
  const content = postDetails?.content as string;
  useEffect(() => {
    try {
      if (rendered.current) return;
      rendered.current = true;
      console.log(content);
      const fixedHTML = content.replace(/<img.*?>/gi, '');
      // const contentState = stateFromHTML(htmlStr as string);
      // console.log(contentState);
      console.log(fixedHTML);
      const blocksFromHtml = htmlToDraft(fixedHTML);
      // console.log(blocksFromHtml);
      if (blocksFromHtml && blocksFromHtml.entityMap) {
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        // const contentState = stateFromHTML(content);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    } catch (error) {
      console.log(error);
    }
  }, [postDetails]);

  // editor 수정 이벤트
  const onEditorStateChange = (editorState: EditorState) => {
    console.log(htmlStr);
    try {
      setEditorState(editorState);
      // setHtmlStr(draftToHtml(convertToRaw(editorState.getCurrentContent())));
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContentState).replace(/<img.*?>/gi, '<p>$&</p>');
      setHtmlStr(htmlContent);
    } catch (error) {
      console.log(error);
    }
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
  if (isLoading) return <Spinner />;
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
    </div>
  );
};
