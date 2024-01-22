"use client";

import Divider from "@/components/common/divider";
import HeaderCenter from "@/components/common/header-center";
import TextButton from "@/components/common/text-button";
import Header from "@/components/header";
import useRedirectToSignIn from "@/hooks/use-redirect-to-sign-in";
import { useGetChatRoom, useSubscribeChatRoom } from "@/query/chat-room";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const ChatRoomPage = () => {
  const router = useRouter();

  const params = useParams();

  const { redirect } = useRedirectToSignIn();

  const { data: chatRoom, isLoading } = useGetChatRoom({
    chatRoomId: params.chatRoomId,
  });

  const { mutate: subscribeChatRoom } = useSubscribeChatRoom({
    onError: (data) => {
      const errorCode = data?.response?.data?.code;

      if (errorCode === "UNAUTHORIZED") {
        redirect();
      }
    },
  });

  if (isLoading) return <></>;

  return (
    <>
      <Header renderCenter={() => <HeaderCenter>채팅방</HeaderCenter>} />

      <div className="w-full aspect-square relative">
        <Image
          src={chatRoom?.imageUrl}
          alt="채팅방 이미지"
          fill={true}
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </div>

      <div className="px-4">
        <div className="text-base py-2">{chatRoom?.name}</div>

        <Divider />

        <div className="text-sm py-2">{chatRoom?.description}</div>
        <Divider />

        <div className="h-10" />

        <TextButton
          text="채팅방 구독"
          onClick={() => {
            subscribeChatRoom({ chatRoomId: chatRoom?.id });
          }}
          disabled={false}
        />
      </div>
    </>
  );
};

export default ChatRoomPage;
