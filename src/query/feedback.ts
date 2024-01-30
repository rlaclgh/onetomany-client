import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import Axios, { CustomError } from ".";

interface CreateFeedbackProps {
  description: string;
}

interface CreateFeedbackResponse {}

const createFeedback: MutationFunction<
  AxiosResponse<CreateFeedbackResponse>,
  CreateFeedbackProps
> = (props: CreateFeedbackProps) => {
  const { description } = props;

  return Axios({
    method: "post",
    url: "/feedback",
    data: {
      description,
    },
  });
};

export const useCreateFeedback = (
  options?: UseMutationOptions<
    AxiosResponse<CreateFeedbackResponse>,
    AxiosError<CustomError>,
    CreateFeedbackProps
  >
) => {
  return useMutation({
    mutationFn: createFeedback,
    ...options,
  });
};
