import axios from "axios";

export function setupApi() {
  const api = axios.create({
    baseURL: "http://192.168.5.38:3333"
  })

  api.interceptors.response.use(response => response, error => {
    if (error.response?.data?.message)
      return Promise.reject(new Error(error.response.data.message));

    return Promise.reject(error);
  })

  return api;
}

export const api = setupApi();