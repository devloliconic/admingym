import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  gymId: string | number;
  othersId: string | number;
};

type Response = unknown;

const deteteOthers: MutationFunction<Response, Params> = async ({
  gymId,
  othersId
}) => {
  return (await instanse.delete(`/gym/${gymId}/others/${othersId}`)).data;
};

export const useDeleteOthers = () => useMutation(deteteOthers);
