import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Ticket } from "@/_types/ticket";

import { instanse } from "../instanse";

type Response = Ticket;

type QueryKey = ["ticket", string];

const getTicket: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  const id = queryKey[1];
  return (await instanse.get(`/ticket/${id}`, {})).data;
};

export const useTicket = <TData = Response>(
  id: number | undefined,
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(["ticket", `${id}`], getTicket, {
    ...options,
    staleTime: 1000 * 60 * 60,
    enabled: !!id
  });
};
