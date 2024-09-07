import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Workout } from "@/_types/workout";

import { instanse } from "../instanse";

type Response = Workout[];
const queryKey = ["workouts"];

type QueryKey = typeof queryKey;

const getWorkouts: QueryFunction<Response, QueryKey> = async () => {
  return (await instanse.get("/workout", {})).data;
};

export const useWorkouts = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(queryKey, getWorkouts, {
    ...options,
    staleTime: 1000 * 60 * 60
  });
};
