import { getBoardListApi } from './../api/boardApi';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '~/api/postApi';

export const usePost = () => {
  const getPost = useQuery(['posts'], getPosts, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const getBoardList = useQuery(['boards'], getBoardListApi, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { getPost, getBoardList };
};
