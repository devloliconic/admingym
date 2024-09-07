import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  coast: number;
  gym_id: number;
};

const updateCaoch: MutationFunction<unknown, Params> = async ({
  id,
  firstName,
  lastName,
  middleName,
  coast,
  gym_id
}) => {
  return (
    await instanse.put(`/coach/${id}`, {
      firstName,
      lastName,
      middleName,
      coast,
      gym_id
    })
  ).data;
};

export const useUpdateCaoch = () => useMutation(updateCaoch);
