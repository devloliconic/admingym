import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  id: string | number;
};

type Response = unknown;

const deleteTicket: MutationFunction<Response, Params> = async ({ id }) => {
  return (await instanse.delete(`/ticket/${id}`)).data;
};

export const useDeleteTicket = () => useMutation(deleteTicket);
