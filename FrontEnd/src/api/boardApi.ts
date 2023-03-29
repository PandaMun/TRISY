import { board } from '~/types/sharedTypes';
import { boardApi } from './axiosConfig';

export const getBoards = async (): Promise<board[]> => {
  const response = await boardApi.get('/board');
  return response.data;
};

export const createBoard = async (payload: board): Promise<board> => {
  console.log(payload);
  const response = await boardApi.post('/board', payload);
  return response.data;
};
