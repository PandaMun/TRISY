import React, { useState } from 'react';
import axios from 'axios';
import TextEditor from './components/PostEditor';

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleTextChange = (value: string) => {
    setContent(value);
  };
  const createPost = async () => {
    try {
      const response = await axios.post('http://localhost:5000/posts', {
        title: title,
        content: content,
        image:
          'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
      });
      console.log('Post created:', response.data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  return (
    <div>
      <div className='fixed top-0 left-0 right-0 z-30 bg-white h-[100px] flex justify-between items-center px-10'>
        <span className='text-3xl font-bold'>TRiSY</span>
        <button
          onClick={createPost}
          className='px-4 py-3 font-bold text-white bg-black border-black hover:scale-105 rounded-2xl hover:bg-white hover:text-black hover:border-2'
        >
          완료
        </button>
      </div>
      <div className='absolute top-[30px] z-40 left-96 right-96'>
        <TextEditor value={content} onChange={handleTextChange} />
      </div>
      <h1>Create Post</h1>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Post title'
        className='border-2'
      />
    </div>
  );
};
