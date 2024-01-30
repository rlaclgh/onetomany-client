"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ChatRoomProps {
  chatRoomId: number;
  name: string;
  description: string;
  imageUrl: string;
}
const ChatRoom = (props: ChatRoomProps) => {
  const { chatRoomId, name, description, imageUrl } = props;

  const router = useRouter();
  return (
    <>
      <div
        className="w-1/2 aspect-square relative p-2"
        onClick={() => {
          router.push(`chat-room/${chatRoomId}`);
        }}
      >
        <div className="absolute inset-2 bg-gradient-to-b from-black/0 to-black opacity-50 z-10 rounded-2xl"></div>
        <Image
          src={imageUrl}
          alt="채팅방 이미지"
          fill={true}
          // priority={true}
          style={{ objectFit: "cover", padding: 8, borderRadius: 24 }}
        />
        <div className="absolute bottom-6 z-10  flex left-0 right-0">
          <div className="text-sm m-auto text-white">{name}</div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
