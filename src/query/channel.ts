import { useQuery } from "@tanstack/react-query";
import Axios from ".";

/**
 * 채널 리스트 불러오기
 */

interface GetChannelsResponse {
  id: number;
  isHost: boolean;
  chatRoom: {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
  };
  lastChat: {
    id: number;
    message: string;
    imageUrl: string;
    createdAt: string;
  };
}

const getChannels = async () => {
  const data = await Axios({
    method: "get",
    url: `/channel`,
  });

  return data.data;
};

export const useGetChannels = () => {
  return useQuery<GetChannelsResponse[]>({
    queryKey: ["channel"],
    queryFn: getChannels,
  });
};
