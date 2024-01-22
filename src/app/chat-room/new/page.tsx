"use client";

import HeaderCenter from "@/components/common/header-center";
import CreateChatRoomForm from "@/components/create-chat-room-form";
import Header from "@/components/header";
import { useEffect } from "react";

const CreateChatRoom = () => {
  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  return (
    <>
      <Header renderCenter={() => <HeaderCenter>채팅방 생성</HeaderCenter>} />

      <div className="h-10" />

      <div className="flex-1 px-4">
        <CreateChatRoomForm />
      </div>
    </>
  );
};

export default CreateChatRoom;
