import { useGetChatRooms } from "@/query/chat-room";
import ChatRoom from "./chat-room";

const ChatRooms = () => {
  const { data: chatRooms, isLoading } = useGetChatRooms();

  if (isLoading) return <></>;
  return (
    <>
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
    </>
  );
};

export default ChatRooms;
