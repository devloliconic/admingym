import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  gymId: string | number;
  equipmentId: string | number;
};

type Response = unknown;

const deleteEquipment: MutationFunction<Response, Params> = async ({
  gymId,
  equipmentId
}) => {
  return (await instanse.delete(`/gym/${gymId}/equipment/${equipmentId}`)).data;
};

export const useDeleteEquipment = () => useMutation(deleteEquipment);
