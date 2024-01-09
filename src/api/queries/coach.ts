import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Coach } from "@/_types/coach";

import { instanse } from "../instanse";

type Response = Coach;

type QueryKey = ["coach", string];

const getCaoch: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  const id = queryKey[1];
  return (await instanse.get(`/coach/${id}`, {})).data;
};

export const useCoach = <TData = Response>(
  id: number | undefined | string,
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(["coach", `${id}`], getCaoch, {
    ...options,
    staleTime: 1000 * 60 * 60,
    enabled: !!id
  });
};
