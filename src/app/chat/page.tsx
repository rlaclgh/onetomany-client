"use client";
import HeaderCenter from "@/components/common/header-center";
import Header from "@/components/header";
import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [client, setClient] = useState<Client | null>(null);

  const [messages, setMessages] = useState<String[]>([]);

  useEffect(() => {
    // if (client) return;
    const client = new Client({
      brokerURL: "ws://127.0.0.1:8080/ws",
      onConnect: () => {
        console.log("connected!!!!");
        client.subscribe("/channel", (message) => {
          console.log("🚀 ~ client.subscribe ~ message:", message);
          setMessages((prev) => [...prev, message.body]);
        });
        // client.publish({ destination: "/ws/channel", body: "First Message" });
      },
      debug(str) {
        console.log(`debug`, str);
      },
    });

    client.onStompError = function (frame) {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    client.activate();

    setClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const onClick = () => {
    client.publish({
      destination: "/ws/channel",
      body: Math.random().toString(),
    });
  };

  return (
    <>
      <Header renderCenter={() => <HeaderCenter>채팅방</HeaderCenter>} />

      <div
        className="w-20 h-20 bg-red-500"
        onClick={() => {
          onClick();
        }}
      >
        누르면 메시지 보냄
      </div>

      {messages.map((x) => (
        <div className="bg-blue">{x}</div>
      ))}
    </>
  );
};

export default ChatPage;
