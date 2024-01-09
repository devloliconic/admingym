import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Gym } from "@/_types/gym";

import { instanse } from "../instanse";

type Response = Gym;

type QueryKey = ["gym", string];

const getGym: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  const id = queryKey[1];
  return (await instanse.get(`/gym/${id}`, {})).data;
};

export const useGym = <TData = Response>(
  id: string | number | undefined,
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(["gym", `${id}`], getGym, {
    ...options,
    staleTime: 1000 * 60 * 60,
    enabled: !!id
  });
};
