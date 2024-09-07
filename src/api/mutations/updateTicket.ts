import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  id: number;
  type: string;
  period: number;
  price: number;
};

const updateTicket: MutationFunction<unknown, Params> = async ({
  id,
  type,
  period,
  price
}) => {
  return (
    await instanse.put(`/ticket/${id}`, {
      type,
      period,
      price
    })
  ).data;
};

export const useUpdateTicket = () => useMutation(updateTicket);
