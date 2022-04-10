import axios from "axios";

export const getPlatforms = (limit: number = 10, offset: number = 0): Promise<Array<Map<string, any>>> => {
  return axios(`/api/platforms?limit=${limit}&offset=${offset}`).then(({ data }) => data).catch(() => {
    return [];
  });
}
