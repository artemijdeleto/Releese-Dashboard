import axios from "axios";

export const getArtists = (limit: number = 10, offset: number = 0): Promise<Array<Map<string, any>>> => {
  return axios(`/api/artists?limit=${limit}&offset=${offset}`).then(({ data }) => data).catch(() => {
    return [];
  });
}

export const getConnectedArtists = (limit: number = 10, offset: number = 0): Promise<Array<Map<string, any>>> => {
  return axios(`/api/artists?limit=${limit}&offset=${offset}`).then(({ data }) => data).catch(() => {
    return [];
  });
}

export const getArtist = (id: number): Promise<Map<string, any>> => {
  return axios(`/api/artists/${id}`).then(({ data }) => data).catch(() => {
    console.error('Failed to get artist', id);
    throw new Error('Failed to get artist');
  });
}


