"use client";

import BottomNavigation from "@/components/bottom-navigation";
import ChatRoom from "@/components/chat-room";
import ChatRooms from "@/components/chat-rooms";
import HeaderCenter from "@/components/common/header-center";
import Header from "@/components/header";
import useLoginRequired from "@/hooks/use-login-required";
import { useGetChatRooms } from "@/query/chat-room";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
      <div
        className="overflow-y-scroll flex-1 pl-2 pr-2"
        style={{ height: "calc(calc(var(--vh, 1vh) * 100) - 112px)" }}
      >
        <ChatRooms />
      </div>
      <BottomNavigation />
    </>
  );
}
