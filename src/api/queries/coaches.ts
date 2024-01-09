import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Coach } from "@/_types/coach";

import { instanse } from "../instanse";

type Response = Coach[];
const queryKey = ["coaches"];

type QueryKey = typeof queryKey;

const getCoches: QueryFunction<Response, QueryKey> = async () => {
  return (await instanse.get("/coach", {})).data;
};

export const useCoaches = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(queryKey, getCoches, {
    ...options,
    staleTime: 1000 * 60 * 60
  });
};
