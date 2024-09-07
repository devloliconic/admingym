import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const instanse = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
  }
});

instanse.interceptors.request.use(
  function (config) {
    if (!config.headers.Authorization) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 180000,
      retry: false,
      cacheTime: 300000
    }
  }
});
