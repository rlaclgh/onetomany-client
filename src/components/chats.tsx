import { MutableRefObject, useEffect, useRef, useState } from "react";
import ChatBubble from "./chat-bubble";
import { useGetChats } from "@/query/chat";
import { useParams } from "next/navigation";
import { dateLongFormat } from "@/utils/date";

interface ChatProps {
  messages: any[];
  bottomRef: MutableRefObject<HTMLDivElement>;
}

const Chats = (props: ChatProps) => {
  const { messages, bottomRef } = props;
  const params = useParams();

  const { data, fetchNextPage, isSuccess, isFetched, isFetchingNextPage } =
    useGetChats(parseInt(params.channelId as string));

  const [isInitial, setIsInitial] = useState(true);

  const ref = useRef<any>();

  // 초기 진입시 스크롤 맨 아래로
  useEffect(() => {
    if (isFetched === true) {
      setTimeout(() => {
        bottomRef.current.scrollIntoView({
          block: "end",
          inline: "nearest",
          behavior: "smooth",
        });
      }, 100);
    }
  }, [isFetched]);

  // 데이터를 추가로 받아올 때
  useEffect(() => {
    if (isInitial === true) {
      setIsInitial(false);
    } else {
      if (!isInitial && isFetchingNextPage === false) {
        if (data.pages.length <= 1) return;
        if (data.pages.at(1).length === 0) return;

        ref.current.scrollTo({
          top: document
            .getElementById(data.pages.at(1).at(0).id)
            .getBoundingClientRect().top,
        });
      }
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (isFetchingNextPage) {
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (!ref) return;
    if (!ref.current) return;

    function onScroll() {
      if (ref.current.scrollTop === 0) {
        if (!isFetchingNextPage) {
          fetchNextPage();
        }
      }
    }

    ref.current.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref]);

  const chats = [...(data?.pages || []).flat(), ...messages];

  return (
    <div
      ref={ref}
      className="overflow-y-scroll z-10 flex-1 pl-4 pr-4"
      style={{ height: "calc(100vh - 105px)" }}
    >
      {chats.map((chat, index) => {
        let needDate = false;
        if (index === 0) {
          needDate = true;
        } else {
          const prevCreatedAt = chats[index - 1].createdAt;
          const currCreatedAt = chat.createdAt;

          const prevDate = dateLongFormat(prevCreatedAt);
          const currDate = dateLongFormat(currCreatedAt);

          if (prevDate != currDate) needDate = true;
        }

        return (
          <>
            {needDate && (
              <div className="m-auto text-center text-sm p-2">
                {dateLongFormat(chat.createdAt)}
              </div>
            )}
            <ChatBubble id={chat.id} key={chat.id} message={chat} />
          </>
        );
      })}

      {/* {messages.map((chat) => {
        return <ChatBubble id={chat.id} key={chat.id} message={chat} />;
      })} */}

      <div ref={bottomRef} className="" />
    </div>
  );
};

export default Chats;
