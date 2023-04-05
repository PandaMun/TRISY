import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import App from './App';

// styles
import './styles/index.scss';
import './index.css';
import Hello from './components/Hello';
import BlogPage from './pages/blog/BlogPage';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';
// import { CreatePost } from './pages/blog/CreatePost';
import { PostDetail } from './pages/blog/PostDetail';

import { Recommand } from './pages/recommand/Recommand';
import { Survey } from './pages/Survey/Survey';
import { NotFound } from './pages/Handle/NotFound';
import { HowToUse } from './pages/HowToUse/HowToUse';
import { MyInfo } from './pages/mypage/MyInfo';
import { Kakao } from './pages/SignIn/Kakao';
import { CreatePost } from './pages/blog/CreatePost';
import { UpdatePost } from './pages/blog/UpdatePost';
import { ProtectedRounte } from './pages/Handle/ProtectedRoute';
import { UpdateProfile } from './pages/mypage/UpdateProfile';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
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
        path: '/map/:location/:id',
        element: <Recommand />,
      },
      {
        path: '/survey',
        element: <Survey />,
      },
      {
        path: '/post/:formattedDate/:id',
        element: <PostDetail />,
      },
      {
        path: '/createPost/:id',
        element: (
          <ProtectedRounte>
            <CreatePost />
          </ProtectedRounte>
        ),
      },
      {
        path: 'blog/update/:id',
        element: (
          <ProtectedRounte>
            <UpdatePost />
          </ProtectedRounte>
        ),
      },
      {
        path: '/login',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/howToUse',
        element: <HowToUse />,
      },
      {
        path: '/myinfo',
        element: (
          <ProtectedRounte>
            <MyInfo />
          </ProtectedRounte>
        ),
      },
      {
        path: '/updateProfile',
        element: (
          <ProtectedRounte>
            <UpdateProfile />
          </ProtectedRounte>
        ),
      },
      {
        path: '/kakao',
        element: <Kakao />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
