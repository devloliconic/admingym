import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { instanse, queryClient } from "../instanse";

type Response = {
  login: string;
  role: string;
};
const queryKey = ["me"];

type QueryKey = typeof queryKey;

const getMe: QueryFunction<Response, QueryKey> = async () => {
  return (
    await instanse.get("/me", {
      //headers: { Authorization: localStorage.getItem("token") }
    })
  ).data;
};

export const useMeHook = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(queryKey, getMe, {
    ...options,
    staleTime: 1000 * 60 * 60
  });
};

export const useGetMe = Object.assign(useMeHook, {
  prefetch: async () => {
    await queryClient.prefetchQuery(queryKey, getMe);
  }
});
