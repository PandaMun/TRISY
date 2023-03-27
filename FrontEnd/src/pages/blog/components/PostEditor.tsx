// src/components/TextEditor.tsx
import { RangeStatic } from 'quill';
import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const toolbarOptions = [
  ['image'], // image upload button
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons

  [{ header: 1 }, { header: 2 }], // custom button values
  [
    { list: 'ordered', className: 'custom-ordered-list' },
    { list: 'bullet', className: 'custom-bullet-list' },
    'list',
  ],

  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ align: [] }],
];

const CustomList = ReactQuill.Quill.import('formats/list');
CustomList.className = 'custom-list';
ReactQuill.Quill.register(CustomList, true);

const CustomListItem = ReactQuill.Quill.import('formats/list/item');
CustomListItem.className = 'custom-list-item';
ReactQuill.Quill.register(CustomListItem, true);

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill>(null);
  const cursorPositionRef = useRef<number | undefined>(undefined);

  const onSelectionChange = (range: RangeStatic | null) => {
    if (range) {
      cursorPositionRef.current = range.index;
    }
  };
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    const editor = quillRef.current?.getEditor();

    input.onchange = async () => {
      const file = input.files![0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageURL = reader.result as string;

        // TODO: Upload the image to your server and get the image URL
        // You can replace the imageURL with the actual uploaded image URL after uploading it to your server

        // Insert the image URL to the editor at the last known cursor position
        if (typeof cursorPositionRef.current === 'number') {
          editor?.insertEmbed(cursorPositionRef.current, 'image', imageURL);
        } else {
          editor?.insertEmbed(editor.getLength(), 'image', imageURL);
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      modules={modules}
      onChangeSelection={onSelectionChange}
    />
  );
};

export default TextEditor;
