import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';

import App from './App';

// styles
import './styles/index.scss';
import './index.css';
import Hello from './components/Hello';
import { Recommand } from './pages/recommand/Recommand';
import { Survey } from './pages/Survey/Survey';
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
        path: '/recommand',
        element: <Recommand />,
      },
      {
        path: '/survey',
        element: <Survey />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
