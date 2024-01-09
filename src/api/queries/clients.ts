import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Client } from "@/_types/client";

import { instanse } from "../instanse";

type Response = Client[];
const queryKey = ["clients"];

type QueryKey = typeof queryKey;

const getClients: QueryFunction<Response, QueryKey> = async () => {
  return (await instanse.get("/client", {})).data;
};

export const useClients = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(queryKey, getClients, {
    ...options,
    staleTime: 1000 * 60 * 60
  });
};
