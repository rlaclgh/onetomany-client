import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Axios from ".";

/**
 * 로그인
 */
interface SignInProps {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

const signIn: MutationFunction<AxiosResponse<SignInResponse>, SignInProps> = (
  props
) => {
  const { email, password } = props;
  return Axios({
    method: "post",
    url: "/auth/sign-in",
    data: {
      email,
      password,
    },
  });
};

export const useSignIn = (
  options?: UseMutationOptions<
    AxiosResponse<SignInResponse>,
    Error,
    SignInProps
  >
) => {
  return useMutation({
    mutationFn: signIn,
    ...options,
  });
};
