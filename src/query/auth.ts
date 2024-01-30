import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import Axios, { CustomError } from ".";

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
    AxiosError<CustomError>,
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
  nickname: string;
  password: string;
  rePassword: string;
}

interface SignUpResponse {}

const signUp: MutationFunction<AxiosResponse<SignUpResponse>, SignUpProps> = (
  props
) => {
  const { email, nickname, password, rePassword } = props;
  return Axios({
    method: "post",
    url: "/auth/sign-up",
    data: {
      email,
      nickname,
      password,
      rePassword,
    },
  });
};

export const useSignUp = (
  options?: UseMutationOptions<
    AxiosResponse<SignUpResponse>,
    AxiosError<CustomError>,
    SignUpProps
  >
) => {
  return useMutation({
    mutationFn: signUp,
    ...options,
  });
};

/**
 * 내 정보 불러오기
 */

interface GetMeResponse {
  id: number;
  email: string;
}

const getMe = async () => {
  const data = await Axios({
    method: "get",
    url: `/auth/me`,
  });

  return data.data;
};

export const useGetMe = () => {
  return useQuery<GetMeResponse>({
    queryKey: ["me"],
    queryFn: getMe,
    retry: 0,
  });
};
