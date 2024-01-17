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

/**
 * 회원가입
 */

interface SignUpProps {
  email: string;
  password: string;
  rePassword: string;
}

interface SignUpResponse {}

const signUp: MutationFunction<AxiosResponse<SignUpResponse>, SignUpProps> = (
  props
) => {
  const { email, password, rePassword } = props;
  return Axios({
    method: "post",
    url: "/auth/sign-up",
    data: {
      email,
      password,
      rePassword,
    },
  });
};

export const useSignUp = (
  options?: UseMutationOptions<
    AxiosResponse<SignUpResponse>,
    Error,
    SignUpProps
  >
) => {
  return useMutation({
    mutationFn: signUp,
    ...options,
  });
};
