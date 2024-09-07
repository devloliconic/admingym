import { MutationFunction, useMutation } from "@tanstack/react-query";

import { Gym } from "@/_types/gym";

import { instanse } from "../instanse";

type Params = {
  name: string;
  gymId: number | string;
  equipmentId: number;
};

type Response = Gym;

const updateOthers: MutationFunction<Response, Params> = async ({
  name,
  equipmentId,
  gymId
}) => {
  return (
    await instanse.put(`/gym/${gymId}/others/${equipmentId}`, {
      name
    })
  ).data;
};

export const useUpdateOthers = () => useMutation(updateOthers);
