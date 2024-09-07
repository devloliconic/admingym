import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  firstName: string;
  lastName: string;
  middleName: string;
  coast: number;
  gym_id: number;
};

type Response = {
  accessToken: string;
};

const createCoach: MutationFunction<Response, Params> = async ({
  firstName,
  lastName,
  middleName,
  coast,
  gym_id
}) => {
  return (
    await instanse.post("/coach", {
      firstName,
      lastName,
      middleName,
      coast,
      gym_id
    })
  ).data;
};

export const useCreateCoach = () => useMutation(createCoach);
