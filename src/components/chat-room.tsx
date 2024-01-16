import Image from "next/image";

interface ChatRoomProps {
  chatRoomId: number;
  name: string;
  description: string;
  imageUrl: string;
}
const ChatRoom = (props: ChatRoomProps) => {
  const { chatRoomId, name, description, imageUrl } = props;
  return (
    <div className="flex shadow p-1 h-16 px-3">
      <Image
        src={imageUrl}
        alt="채팅방 이미지"
        width={56}
        height={56}
        className="rounded-full"
        style={{ objectFit: "cover" }}
      />

      <div className="flex flex-col overflow-x-hidden flex-1 px-4 py-2">
        <div className="text-base">{name}</div>
        <p className="text-wrap break-words truncate line-clamp-1 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ChatRoom;
