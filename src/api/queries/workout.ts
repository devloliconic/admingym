import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Workout } from "@/_types/workout";

import { instanse } from "../instanse";

type Response = Workout;

type QueryKey = ["workout", string];

const getWorkout: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  const id = queryKey[1];
  return (await instanse.get(`/workout/${id}`, {})).data;
};

export const useWorkout = <TData = Response>(
  id: number | undefined | string,
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(["workout", `${id}`], getWorkout, {
    ...options,
    staleTime: 1000 * 60 * 60,
    enabled: !!id
  });
};
