"use client";

import ChatRoom from "@/components/chat-room";
import HeaderCenter from "@/components/common/header-center";
import Header from "@/components/header";
import LogInOutHeader from "@/components/log-in-out-header";
import Preparing from "@/components/preparing";
import { useGetChannels } from "@/query/channel";
import { useRouter } from "next/navigation";

const ChannelsPage = () => {
  const router = useRouter();
  const { data: channels, isLoading } = useGetChannels();

  if (isLoading) return <></>;

  return (
    <>
      <Header
        renderCenter={() => <HeaderCenter>참여중인 채널</HeaderCenter>}
        renderRight={() => <LogInOutHeader />}
      />

      {channels.map((chatRoom) => {
        return (
          <ChatRoom
            key={chatRoom?.chatRoom?.id}
            chatRoomId={chatRoom?.chatRoom?.id}
            name={chatRoom?.chatRoom?.name}
            description={chatRoom?.chatRoom?.description}
            imageUrl={chatRoom?.chatRoom?.imageUrl}
          />
        );
      })}

      <Preparing />
    </>
  );
};

export default ChannelsPage;
