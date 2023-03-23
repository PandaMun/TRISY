import { post } from '~/types/sharedTypes';
import { mockApi } from './axiosConfig';

export const getPosts = async (): Promise<post[]> => {
  const response = await mockApi.get('/posts');
  return response.data;
};

export const getPostById = async (id: string): Promise<post> => {
  const response = await mockApi.get(`/posts/${id}`);
  return response.data;
};
