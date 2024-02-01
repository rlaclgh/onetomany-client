"use client";

import BottomNavigation from "@/components/bottom-navigation";
import ChatRoom from "@/components/chat-room";
import HeaderCenter from "@/components/common/header-center";
import Header from "@/components/header";
import useLoginRequired from "@/hooks/use-login-required";
import { useGetChatRooms } from "@/query/chat-room";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: chatRooms, isLoading } = useGetChatRooms();

  const { loginRequired } = useLoginRequired();

  return (
    <>
      <Header
        renderCenter={() => <HeaderCenter>채팅방 찾기</HeaderCenter>}
        renderRight={() => (
          <button
            className="bg-blue h-8 pr-2 pl-2 rounded-xl"
            onClick={() => {
              loginRequired(() => {
                router.push("/chat-room/new");
              });
            }}
          >
            <span className="text-white text-base">생성</span>
          </button>
        )}
      />

      <div className="flex flex-wrap">
        {chatRooms &&
          chatRooms.map((chatRoom) => {
            return (
              <ChatRoom
                key={chatRoom?.id}
                chatRoomId={chatRoom?.id}
                name={chatRoom?.name}
                description={chatRoom?.description}
                imageUrl={chatRoom?.imageUrl}
                tags={chatRoom?.tags}
              />
            );
          })}
      </div>
      <BottomNavigation />

      {/* {MOCK.map((mock) => {
        return <ChatRoom key={mock.chatRoomId} {...mock} />;
      })} */}
    </>
  );
}
