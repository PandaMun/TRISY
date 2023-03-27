import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import 'react-quill/dist/quill.snow.css';
import App from './App';

// styles
import './styles/index.scss';
import './index.css';
import Hello from './components/Hello';
import BlogPage from './pages/blog/BlogPage';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';
import { CreatePost } from './pages/blog/CreatePost';
import { PostDetail } from './pages/blog/PostDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/hello',
        element: <Hello />,
      },
      {
        path: '/blog',
        element: <BlogPage />,
      },
      {
        path: '/post/:id',
        element: <PostDetail />,
      },
      {
        path: '/createPost',
        element: <CreatePost />,
      },
      {
        path: '/login',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
