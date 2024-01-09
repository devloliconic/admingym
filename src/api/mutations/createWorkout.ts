import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  client_id: number;
  gym_id: number;
  coach_id: number;
  date: string;
};

type Response = {
  accessToken: string;
};

const createWorkout: MutationFunction<Response, Params> = async ({
  client_id,
  gym_id,
  date,
  coach_id
}) => {
  return (
    await instanse.post("/workout", {
      client_id,
      gym_id,
      coach_id,
      date
    })
  ).data;
};

export const useCreateWorkout = () => useMutation(createWorkout);
