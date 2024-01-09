import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  id: string | number;
};

type Response = unknown;

const deleteWorkout: MutationFunction<Response, Params> = async ({ id }) => {
  return (await instanse.delete(`/workout/${id}`)).data;
};

export const useDeleteWorkout = () => useMutation(deleteWorkout);
