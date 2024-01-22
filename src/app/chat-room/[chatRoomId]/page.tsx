"use client";

import Divider from "@/components/common/divider";
import HeaderCenter from "@/components/common/header-center";
import TextButton from "@/components/common/text-button";
import Header from "@/components/header";
import useRedirectToSignIn from "@/hooks/use-redirect-to-sign-in";
import { useGetChatRoom, useSubscribeChatRoom } from "@/query/chat-room";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const MOCK = {
  chatRoomId: 1,
  name: "제목1",
  description: "설명 입니다.",
  imageUrl:
    "https://i.pinimg.com/564x/6a/95/83/6a958390de7924f68e1dfbd57d8c41d6.jpg",
};

const ChatRoomPage = () => {
  const router = useRouter();

  const params = useParams();
  const { chatRoomId, imageUrl, name, description } = MOCK;

  const { redirect } = useRedirectToSignIn();

  const { data: chatRoom } = useGetChatRoom({ chatRoomId: params.chatRoomId });
  console.log("🚀 ~ ChatRoomPage ~ chatRoom:", chatRoom);

  const { mutate: subscribeChatRoom } = useSubscribeChatRoom({
    onError: (data) => {
      const errorCode = data?.response?.data?.code;

      if (errorCode === "UNAUTHORIZED") {
        redirect();
      }
    },
  });

  return (
    <>
      <Header renderCenter={() => <HeaderCenter>채팅방</HeaderCenter>} />

      <div className="w-full aspect-square relative">
        <Image
          src={imageUrl}
          alt="채팅방 이미지"
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="px-4">
        <div className="text-base py-2">{name}</div>

        <Divider />

        <div className="text-sm py-2">{description}</div>
        <Divider />

        <div className="h-10" />

        <TextButton
          text="채팅방 구독"
          onClick={() => {
            subscribeChatRoom({ chatRoomId });
          }}
          disabled={false}
        />
      </div>
    </>
  );
};

export default ChatRoomPage;
