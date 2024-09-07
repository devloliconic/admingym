import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  email: string;
  password: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  birthDate?: string | null;
  ticketId?: string;
};

type Response = {
  accessToken: string;
};

const createClient: MutationFunction<Response, Params> = async ({
  email,
  password,
  firstName,
  middleName,
  lastName,
  gender,
  birthDate,
  ticketId
}) => {
  return (
    await instanse.post("/client", {
      email,
      password,
      firstName,
      middleName,
      lastName,
      gender,
      birthDate,
      ticketId
    })
  ).data;
};

export const useCreateClient = () => useMutation(createClient);
