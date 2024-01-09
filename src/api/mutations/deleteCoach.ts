import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  id: string | number;
};

type Response = unknown;

const deleteCoach: MutationFunction<Response, Params> = async ({ id }) => {
  return (await instanse.delete(`/coach/${id}`)).data;
};

export const useDeleteCoach = () => useMutation(deleteCoach);
