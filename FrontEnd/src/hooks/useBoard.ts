import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { delBoardApi } from '~/api/boardApi';

export const useBoard = () => {
  const navigate = useNavigate();
  const client = useQueryClient();

  const delBoard = useMutation((id: string) => delBoardApi(id), {
    onSuccess: () => {
      alert('삭제되었습니다');
      navigate('/blog');
      client.invalidateQueries(['boards']);
    },
    onError: () => {
      // console.log(error);
    },
  });

  return { delBoard };
};
