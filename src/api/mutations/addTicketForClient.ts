import { MutationFunction, useMutation } from "@tanstack/react-query";

import { Client } from "@/_types/client";

import { instanse } from "../instanse";

type Params = {
  id: number;
  ticketId: number;
};

type Response = Client;

const addTicket: MutationFunction<Response, Params> = async ({
  ticketId,
  id
}) => {
  return (
    await instanse.post(`/client/${id}/add-ticket`, {
      ticketId
    })
  ).data;
};

export const useAddTicketForClient = () => useMutation(addTicket);
