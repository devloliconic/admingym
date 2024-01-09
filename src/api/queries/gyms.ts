import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Gym } from "@/_types/gym";

import { instanse } from "../instanse";

type Response = Gym[];
const queryKey = ["gyms"];

type QueryKey = typeof queryKey;

const getGyms: QueryFunction<Response, QueryKey> = async () => {
  return (await instanse.get("/gym", {})).data;
};

export const useGyms = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(queryKey, getGyms, {
    ...options,
    staleTime: 1000 * 60 * 60
  });
};
