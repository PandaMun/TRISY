import { useQuery } from '@tanstack/react-query';
import { getPosts } from '~/api/postApi';

export const usePost = () => {
  const getPost = useQuery(['posts'], getPosts);
  return { getPost };
};
