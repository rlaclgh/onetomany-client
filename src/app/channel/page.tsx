"use client";

import BottomNavigation from "@/components/bottom-navigation";
import Channel from "@/components/channel";
import ChatRoom from "@/components/chat-room";
import HeaderCenter from "@/components/common/header-center";
import Header from "@/components/header";
import LogInOutHeader from "@/components/log-in-out-header";
import Preparing from "@/components/preparing";
import { useGetChannels } from "@/query/channel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChannelsPage = () => {
  const router = useRouter();
  const { data: channels, isLoading } = useGetChannels();

  if (isLoading) return <></>;

  return (
    <>
      <Header renderCenter={() => <HeaderCenter>참여중인 채널</HeaderCenter>} />

      {channels.map((channel) => {
        return (
          <Channel
            key={channel?.id}
            channelId={channel?.id}
            name={channel?.chatRoom?.name}
            imageUrl={channel?.chatRoom?.imageUrl}
            lastChat={channel?.lastChat}
            unReadCount={channel?.unReadCount}
          />
        );
      })}

      <BottomNavigation />
    </>
  );
};

export default ChannelsPage;
