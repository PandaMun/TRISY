import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';

import App from './App';

// styles
import './styles/index.scss';
import './index.css';
import Hello from './components/Hello';
import BlogPage from './pages/blog/BlogPage';
import { SignIn } from './pages/SignIn/SignIn';

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
        path: 'login',
        element: <SignIn />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
