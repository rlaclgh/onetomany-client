import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import Axios, { CustomError } from ".";
import { AxiosError, AxiosResponse } from "axios";

interface CreateTagProps {
  name: string;
}
interface CreateTagResponse {
  id: number;
  name: string;
}

const createTag: MutationFunction<
  AxiosResponse<CreateTagResponse>,
  CreateTagProps
> = (props) => {
  const { name } = props;
  return Axios({
    method: "post",
    url: `/tag`,
    data: {
      name,
    },
  });
};

export const useCreateTag = (
  options?: UseMutationOptions<
    AxiosResponse<CreateTagResponse>,
    AxiosError<CustomError>,
    CreateTagProps
  >
) => {
  return useMutation({
    mutationFn: createTag,
    ...options,
  });
};
