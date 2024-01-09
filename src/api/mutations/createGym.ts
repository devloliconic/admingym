import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  name: string;
  сapacity: number;
  phoneNumber: string;
  email: string;
  address: string;
  index: number;
};

type Response = {
  accessToken: string;
};

const createGym: MutationFunction<Response, Params> = async ({
  name,
  сapacity,
  phoneNumber,
  email,
  address,
  index
}) => {
  return (
    await instanse.post("/gym", {
      name,
      сapacity,
      phoneNumber,
      email,
      address,
      index
    })
  ).data;
};

export const useCreateGym = () => useMutation(createGym);
