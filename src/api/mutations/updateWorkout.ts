import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  client_id: number;
  gym_id: number;
  workout_id: number;
  coach_id: number;
  date: string;
};

type Response = {
  accessToken: string;
};

const updateWorkout: MutationFunction<Response, Params> = async ({
  client_id,
  gym_id,
  date,
  coach_id,
  workout_id
}) => {
  return (
    await instanse.put(`/workout/${workout_id}`, {
      client_id,
      gym_id,
      coach_id,
      date
    })
  ).data;
};

export const useUpdateWorkout = () => useMutation(updateWorkout);
