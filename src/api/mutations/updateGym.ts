import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  id: number | string;
  name: string;
  сapacity: number;
  phoneNumber: string;
  email: string;
  address: string;
  index: number;
};

const updateGym: MutationFunction<unknown, Params> = async ({
  id,
  name,
  сapacity,
  phoneNumber,
  email,
  address,
  index
}) => {
  return (
    await instanse.put(`/gym/${id}`, {
      name,
      сapacity,
      phoneNumber,
      email,
      address,
      index
    })
  ).data;
};

export const useUpdateGym = () => useMutation(updateGym);
