"use client";
import HeaderCenter from "@/components/common/header-center";
import Header from "@/components/header";
import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import ChatInputForm from "@/components/chat-input-form";
import Chats from "@/components/chats";
import ArrowDown from "@/public/arrow-down.svg";
import { useGetMe } from "@/query/auth";

const ChannelPage = () => {
  const [client, setClient] = useState<Client | null>(null);
  const params = useParams();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [lastMessage, setLastMessage] = useState();
  const { data, isSuccess } = useGetMe();

  const [messages, setMessages] = useState<any[]>([]);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        block: "end",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!lastMessage) return;
    // 메시지가 업데이트될 때마다 스크롤 이벤트를 처리
    scrollToBottom();
  }, [lastMessage]);

  useEffect(() => {
    const client = new Client({
      brokerURL: process.env.NEXT_PUBLIC_SERVER_WS_URL,
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      onConnect: () => {
        client.subscribe(
          `/channel/${params.channelId}`,
          (message) => {
            const parsed = JSON.parse(message.body);
            setMessages((prev) => [...prev, parsed]);

            setLastMessage(parsed);
          },
          {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        );
        // client.publish({ destination: "/ws/channel", body: "First Message" });
      },
      debug(str) {
        console.log(`debug`, str);
      },
    });

    client.activate();

    setClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  if (!isSuccess) return <></>;

  return (
    <>
      <Header renderCenter={() => <HeaderCenter>채팅방</HeaderCenter>} />
      <Chats messages={messages} bottomRef={bottomRef} />

      {/* <div
        className="absolute bottom-20 left-0 right-0 flex"
        onClick={() => {
          scrollToBottom();
        }}
      >
        <div className="m-auto rounded-full w-8 h-8 text-center self-center flex justify-center items-center shadow">
          <ArrowDown width={20} height={20} />
        </div>
      </div> */}
      <ChatInputForm client={client} bottomRef={bottomRef} />
    </>
  );
};

export default ChannelPage;
