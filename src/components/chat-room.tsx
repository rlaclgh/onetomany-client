"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ChatRoomProps {
  chatRoomId: number;
  name: string;
  description: string;
  imageUrl: string;
  tags: TagProps[];
}

interface TagProps {
  id: number;
  name: string;
}
const ChatRoom = (props: ChatRoomProps) => {
  const { chatRoomId, name, description, imageUrl, tags = [] } = props;

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
        <div className="absolute bottom-2 z-10  flex left-0 right-0 flex-col">
          <div className="text-sm m-auto text-white">{name}</div>

          <div className="flex pl-3 pr-3 flex-wrap gap-1 h-10 overflow-hidden">
            {tags.map((tag) => {
              return (
                <div
                  key={tag.id}
                  className="text-white text-xs border border-white rounded pl-1 pr-1 h-4 inline-block"
                >
                  {tag.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
