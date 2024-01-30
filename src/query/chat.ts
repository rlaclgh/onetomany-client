import { useInfiniteQuery } from "@tanstack/react-query";
import Axios, { stringify } from ".";
import queryString from "query-string";

const getChats = async (props: any) => {
  const query = stringify(props);
  const data = await Axios({
    method: "get",
    url: `/chat?${query}`,
  });

  return data.data;
};

export const useGetChats = (channelId: number) => {
  return useInfiniteQuery({
    queryKey: ["chat"],
    queryFn: ({ pageParam }) => getChats({ pageParam, channelId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage?.content?.length === 0) return undefined;
      return lastPageParam + 1;
    },

    select: (data: any) => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
  });
};
