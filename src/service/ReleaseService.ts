import axios from "axios";

export const getReleases = (limit: number = 10, offset: number = 0): Promise<Array<Map<string, any>>> => {
  return axios(`/api/releases?limit=${limit}&offset=${offset}`).then(({ data }) => data);
}

export const getRelease = (id: number): Promise<Map<string, any>> => {
  return axios(`/api/releases/${id}`).then(({ data }) => data);
}

export const createRelease = (data: Map<string, any>): Promise<Map<string, any>> => {
  return axios.post(`/api/releases`, data).then(({ data }) => data).catch((e) => {
    console.error(e.message);
    throw new Error(e.message);
  });
}

export const updateRelease = (id: number, data: Map<string, any>): Promise<Map<string, any>> => {
  return axios.put(`/api/releases/${id}`, data).then(({ data }) => data).catch((e) => {
    console.error(e.message);
    throw new Error(e.message);
  });
}
