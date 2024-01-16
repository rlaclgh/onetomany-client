"use client";

import Divider from "@/components/common/divider";
import HeaderCenter from "@/components/common/header-center";
import TextButton from "@/components/common/text-button";
import Header from "@/components/header";
import Image from "next/image";

const MOCK = {
  chatRoomId: 1,
  name: "제목1",
  description: "설명 입니다.",
  imageUrl:
    "https://i.pinimg.com/564x/6a/95/83/6a958390de7924f68e1dfbd57d8c41d6.jpg",
};

const ChatRoomPage = () => {
  const { imageUrl, name, description } = MOCK;
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

        <TextButton text="채팅방 구독" onClick={() => {}} disabled={false} />
      </div>
    </>
  );
};

export default ChatRoomPage;
