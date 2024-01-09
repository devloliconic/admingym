import { Address } from "./address";
import { Contact } from "./contact";
import { Equipment, Others } from "./equipment";

export type Gym = {
  gym_id: number;
  name: string;
  сapacity: number;
  address_id: number;
  contact_id: number;
  address: Address;
  contact: Contact;
  equipment: Equipment[];
  others: Others[];
};
