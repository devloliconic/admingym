import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Others } from "@/_types/equipment";

import { instanse } from "../instanse";

type Response = Others;

type QueryKey = ["gym", string, string];

const getOthers: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  const id = queryKey[1];
  const equipmentId = queryKey[2];
  return (await instanse.get(`/gym/${id}/others/${equipmentId}`, {})).data;
};

export const useGetOthers = <TData = Response>(
  id: string | number | undefined,
  equipmentId: string | number | undefined,
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(["gym", `${id}`, `${equipmentId}`], getOthers, {
    ...options,
    staleTime: 1000 * 60 * 60,
    enabled: !!id && !!equipmentId
  });
};
