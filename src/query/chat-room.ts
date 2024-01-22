import {
  MutationFunction,
  QueryFunction,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import Axios, { CustomError } from ".";

/**
 * 채팅방 구독
 */

interface SubscribeChatRoomProps {
  chatRoomId: number;
}

interface SubscribeChatRoomResponse {}

const subscribeChatRoom: MutationFunction<
  AxiosResponse<SubscribeChatRoomResponse>,
  SubscribeChatRoomProps
> = (props) => {
  const { chatRoomId } = props;
  return Axios({
    method: "post",
    url: `/chat-room/${chatRoomId}/subscribe`,
  });
};

export const useSubscribeChatRoom = (
  options?: UseMutationOptions<
    AxiosResponse<SubscribeChatRoomResponse>,
    AxiosError<CustomError>,
    SubscribeChatRoomProps
  >
) => {
  return useMutation({
    mutationFn: subscribeChatRoom,
    ...options,
  });
};

/**
 * 채팅방 생성
 */

interface CreateChatRoomProps {
  name: string;
  description: string;
  imageUrl: string;
}

interface CreateChatRoomResponse {}

const createChatRoom: MutationFunction<
  AxiosResponse<CreateChatRoomResponse>,
  CreateChatRoomProps
> = (props) => {
  const { name, description, imageUrl } = props;
  return Axios({
    method: "post",
    url: "/chat_room",
    data: {
      name,
      description,
      imageUrl,
    },
  });
};

export const useCreateChatRoom = (
  options?: UseMutationOptions<
    AxiosResponse<CreateChatRoomResponse>,
    AxiosError<CustomError>,
    CreateChatRoomProps
  >
) => {
  return useMutation({
    mutationFn: createChatRoom,
    ...options,
  });
};

/**
 * 채팅방 리스트 불러오기
 */

interface GetChatRoomResponse {
  id: number;
  isHost: boolean;
  chatRoom: {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
  };
}

const getChatRooms = async () => {
  const data = await Axios({
    method: "get",
    url: `/chat_room`,
  });

  return data.data;
};

export const useGetChatRooms = () => {
  return useQuery<GetChatRoomResponse[]>({
    queryKey: ["das"],
    queryFn: getChatRooms,
  });
};

/**
 * 채팅방 불러오기
 */

interface ChatRoomResponse {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

const getChatRoom = async (props: any) => {
  const { chatRoomId } = props;
  const data = await Axios({
    method: "get",
    url: `/chat_room/${chatRoomId}`,
  });

  return data.data;
};

export const useGetChatRoom = (props: any) => {
  return useQuery<ChatRoomResponse>({
    queryKey: ["chat_room"],
    queryFn: () => getChatRoom(props),
  });
};
