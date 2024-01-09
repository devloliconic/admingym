import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Client } from "@/_types/client";

import { instanse } from "../instanse";

type Response = Client;

type QueryKey = ["client", string];

const getClient: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  const id = queryKey[1];
  return (await instanse.get(`/client/${id}`, {})).data;
};

export const useClient = <TData = Response>(
  id: number | undefined,
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(["client", `${id}`], getClient, {
    ...options,
    staleTime: 1000 * 60 * 60,
    enabled: !!id
  });
};
