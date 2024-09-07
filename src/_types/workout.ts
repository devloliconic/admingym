import { Client } from "./client";
import { Coach } from "./coach";
import { Gym } from "./gym";

export type Workout = {
  workout_id: number;
  client_id: number;
  coach_id: number;
  gym_id: number;
  user: Client;
  coach: Coach;
  date: string;
  gym: Omit<Gym, "address" | "contact" | "equipment" | "others">;
};
