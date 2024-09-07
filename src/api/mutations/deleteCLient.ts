import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  id: string | number;
};

type Response = unknown;

const deleteClient: MutationFunction<Response, Params> = async ({ id }) => {
  return (await instanse.delete(`/client/${id}`)).data;
};

export const useDeleteClient = () => useMutation(deleteClient);
