import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Ticket } from "@/_types/ticket";

import { instanse } from "../instanse";

type Response = Ticket[];
const queryKey = ["tickets"];

type QueryKey = typeof queryKey;

const getTickets: QueryFunction<Response, QueryKey> = async () => {
  return (await instanse.get("/ticket", {})).data;
};

export const useTickets = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(queryKey, getTickets, {
    ...options,
    staleTime: 1000 * 60 * 60
  });
};
