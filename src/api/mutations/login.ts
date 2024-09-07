import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  login: string;
  password: string;
};

type Response = {
  accessToken: string;
};

const login: MutationFunction<Response, Params> = async ({
  login,
  password
}) => {
  return (await instanse.post("/login", { login, password })).data;
};

export const useLogin = () => useMutation(login);
