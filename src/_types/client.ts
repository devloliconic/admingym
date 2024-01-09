import { Ticket } from "./ticket";

export type Client = {
  user_id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: "male" | "female";
  birthDate?: string;
  tickets: Ticket[];
};
