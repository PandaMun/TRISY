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
      <h1>Create Post</h1>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Post title'
        className='border-2'
      />
      {/* <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Post Content'
        className='border-2'
      /> */}
      <div className='w-[90%] mx-auto my-20'>
        <TextEditor value={content} onChange={handleTextChange} />
      </div>
      <button onClick={createPost}>Create</button>
    </div>
  );
};
