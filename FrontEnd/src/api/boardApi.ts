import { board } from '~/types/sharedTypes';
import { boardApi } from './axiosConfig';

export const getBoardListApi = async (): Promise<board[]> => {
  console.log('qwd');
  const response = await boardApi.get('/board');
  return response.data.content;
};

export const getBoardById = async (id: string): Promise<board> => {
  const response = await boardApi.get(`/board/${id}`);
  return response.data;
};

export const createBoard = async (payload: board): Promise<board> => {
  console.log(payload);
  const response = await boardApi.post('/board', payload);
  return response.data;
};

export const getTourListApi = async (): Promise<board[]> => {
  const response = await boardApi.get('/tour');
  return response.data;
};
