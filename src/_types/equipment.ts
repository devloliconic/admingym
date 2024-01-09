export type Equipment = {
  equipment_id: number;
  name: string;
  gym_id: number;
};

export type Others = Omit<Equipment, "equipment_id"> & { others_id: number };
