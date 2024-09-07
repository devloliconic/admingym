import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  birthDate?: string | null;
};

const updateClient: MutationFunction<unknown, Params> = async ({
  id,
  email,
  password,
  firstName,
  middleName,
  lastName,
  gender,
  birthDate
}) => {
  return (
    await instanse.put(`/client/${id}`, {
      email,
      password,
      firstName,
      middleName,
      lastName,
      gender,
      birthDate
    })
  ).data;
};

export const useUpdateCliet = () => useMutation(updateClient);
