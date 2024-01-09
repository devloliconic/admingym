import { Gym } from "./gym";

export type Coach = {
  coach_id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  coast: number;
  gym_id: number;
  gym: Gym;
};
