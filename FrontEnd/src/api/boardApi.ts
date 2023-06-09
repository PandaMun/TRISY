import { board, createBoard, tourList, BoardResponse, tourDetail } from '~/types/sharedTypes';
import { boardApi } from './axiosConfig';

export const getBoardListApi = async (num: string): Promise<BoardResponse> => {
  // console.log('qwd', num);
  // console.log(num);
  const response = await boardApi.get('/board?page=' + num);
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

export const getRandomBoardListApi = async (): Promise<board[]> => {
  const response = await boardApi.get('/board/views');
  // console.log(response);
  return response.data;
};

export const getBoardById = async (id: string): Promise<board> => {
  const response = await boardApi.get(`/board/${id}`);
  // console.log(response);
  return response.data;
};

export const createBoardApi = async (payload: createBoard): Promise<createBoard> => {
  // console.log(payload);
  const response = await boardApi.post('/board', payload);
  return response.data;
};

export const updateBoardApi = async (payload: createBoard): Promise<createBoard> => {
  const response = await boardApi.put(`/board/${payload.tourId}`, payload);
  return response.data;
};

export const getTourListApi = async (): Promise<tourList[]> => {
  const response = await boardApi.get('/tour');
  return response.data;
};
export const getTourByIdApi = async (id: string): Promise<tourDetail> => {
  const response = await boardApi.get(`/tour/${id}`);
  return response.data;
};
export const delTourApi = async (id: string) => {
  const response = await boardApi.delete(`/tour/${id}`);
  return response.data;
};
export const delBoardApi = async (id: string): Promise<board> => {
  const response = await boardApi.delete(`/board/${id}`);
  return response.data;
};
export const surveyPushApi = async (result: { survey: string }): Promise<board> => {
  const response = await boardApi.post(`/tour/survey`, result);
  return response.data;
};

export const surveyCheckApi = async (): Promise<board> => {
  const response = await boardApi.get(`/tour/survey`);
  return response.data;
};
export const createScheduleApi = async (v: any): Promise<board> => {
  const response = await boardApi.post(`/tour`, v);
  return response.data;
};

export const updateTourNameApi = async (id: string, tourName: string): Promise<tourDetail> => {
  const response = await boardApi.put(`/tour/${id}`, { tourName: tourName });
  return response.data;
};
///////////////// lcm
export const getTourApi = async (id: string) => {
  const response = await boardApi.get(`/tour/${id}`);
  return response.data;
};
////////////////
