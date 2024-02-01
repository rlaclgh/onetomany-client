"use client";

import Divider from "@/components/common/divider";
import HeaderCenter from "@/components/common/header-center";
import TextButton from "@/components/common/text-button";
import Header from "@/components/header";
import useLoginRequired from "@/hooks/use-login-required";
import { useGetMe } from "@/query/auth";
import { useGetChatRoom, useSubscribeChatRoom } from "@/query/chat-room";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ChatRoomPage = () => {
  const router = useRouter();

  const params = useParams();

  const { data: chatRoom, isLoading } = useGetChatRoom({
    chatRoomId: params.chatRoomId,
  });

  const { mutate: subscribeChatRoom } = useSubscribeChatRoom({
    onSuccess: (data) => {
      toast.success("구독이 완료되었습니다.");
      router.push(`/channel/${data.data.id}`);
    },
    onError: (data) => {
      toast.error(data?.response?.data?.message);
    },
  });

  const { loginRequired } = useLoginRequired();

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

        <div className="h-4" />

        <div className="flex flex-wrap gap-2">
          {chatRoom.tags.map((tag) => {
            return (
              <div
                className="bg-blue p-1 rounded-xl flex justify-center items-center"
                key={tag.id}
              >
                <div className="text-sm text-white">{tag.name}</div>
              </div>
            );
          })}
        </div>

        <div className="h-10" />

        <TextButton
          text="채팅방 구독"
          onClick={() =>
            loginRequired(() => {
              subscribeChatRoom({ chatRoomId: chatRoom?.id });
            })
          }
          disabled={false}
        />
      </div>
    </>
  );
};

export default ChatRoomPage;
