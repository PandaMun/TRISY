import { post } from '~/types/sharedTypes';
import { mockApi } from './axiosConfig';

export const getPosts = async (): Promise<post[]> => {
  const response = await mockApi.get('/posts');
  console.log(response);
  return response.data;
};
