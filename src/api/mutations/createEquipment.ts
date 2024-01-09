import { MutationFunction, useMutation } from "@tanstack/react-query";

import { Gym } from "@/_types/gym";

import { instanse } from "../instanse";

type Params = {
  name: string;
  gymId: number | string;
};

type Response = Gym;

const createEquipment: MutationFunction<Response, Params> = async ({
  name,
  gymId
}) => {
  return (
    await instanse.post(`/gym/${gymId}/equipment`, {
      name
    })
  ).data;
};

export const useCreateEquipment = () => useMutation(createEquipment);
