import { board, createBoard, tourList } from '~/types/sharedTypes';
import { boardApi } from './axiosConfig';

export const getBoardListApi = async (): Promise<board[]> => {
  console.log('qwd');
  const response = await boardApi.get('/board');
  return response.data.content;
};

export const getBoardById = async (id: string): Promise<board> => {
  const response = await boardApi.get(`/board/${id}`);
  console.log(response);
  return response.data;
};

export const createBoardApi = async (payload: createBoard): Promise<createBoard> => {
  console.log(payload);
  const response = await boardApi.post('/board', payload);
  return response.data;
};

export const getTourListApi = async (): Promise<tourList[]> => {
  const response = await boardApi.get('/tour');
  return response.data;
};
