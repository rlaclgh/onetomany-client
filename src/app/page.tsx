"use client";

import ChatRoom from "@/components/chat-room";
import HeaderCenter from "@/components/common/header-center";
import TextButton from "@/components/common/text-button";
import Header from "@/components/header";
import LogInOutHeader from "@/components/log-in-out-header";
import { useGetChatRooms } from "@/query/chat-room";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: chatRooms, isLoading } = useGetChatRooms();

  if (isLoading) return <></>;

  return (
    <>
      <Header
        renderCenter={() => <HeaderCenter>채팅방 찾기</HeaderCenter>}
        renderRight={() => <LogInOutHeader />}
      />

      <div className="h-4" />

      <TextButton
        text="채팅방 생성"
        onClick={() => {
          router.push("/chat-room/new");
          // router.push("/sign-up");
        }}
        disabled={false}
      />
      <div className="h-4" />

      {chatRooms.map((chatRoom) => {
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

      {/* {MOCK.map((mock) => {
        return <ChatRoom key={mock.chatRoomId} {...mock} />;
      })} */}
    </>
  );
}
