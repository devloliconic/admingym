import { MutationFunction, useMutation } from "@tanstack/react-query";

import { Gym } from "@/_types/gym";

import { instanse } from "../instanse";

type Params = {
  name: string;
  gymId: number | string;
  equipmentId: number | string;
};

type Response = Gym;

const updateEquipment: MutationFunction<Response, Params> = async ({
  name,
  equipmentId,
  gymId
}) => {
  return (
    await instanse.put(`/gym/${gymId}/equipment/${equipmentId}`, {
      name
    })
  ).data;
};

export const useUpdateEquipment = () => useMutation(updateEquipment);
