import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  id: string | number;
};

type Response = unknown;

const deleteGym: MutationFunction<Response, Params> = async ({ id }) => {
  return (await instanse.delete(`/gym/${id}`)).data;
};

export const useDeleteGym = () => useMutation(deleteGym);
