import axios from "axios";

export const getArtists = (limit: number = 10, offset: number = 0): Promise<Array<Map<string, any>>> => {
  return axios(`/api/artists?limit=${limit}&offset=${offset}`).then(({ data }) => data).catch(() => {
    return [];
  });
}

export const createStorageItem = (data: any): Promise<Map<string, any>> => {
  return axios.post(`/api/storage`, data).then(({ data }) => data).catch(() => {
    console.error('Failed to create storage item');
    throw new Error('Failed to create storage item');
  });
}
