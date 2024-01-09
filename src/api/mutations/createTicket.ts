import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  type: string;
  period: number;
  price: number;
};

type Response = {
  accessToken: string;
};

const createTicket: MutationFunction<Response, Params> = async ({
  type,
  period,
  price
}) => {
  return (
    await instanse.post("/ticket", {
      type,
      period,
      price
    })
  ).data;
};

export const useCreateTicket = () => useMutation(createTicket);
