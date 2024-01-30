"use client";
import { dateFormat } from "@/utils/date";
import Image from "next/image";

import { useRouter } from "next/navigation";

interface ChannelProps {
  channelId: number;
  name: string;
  imageUrl: string;

  lastChat: {
    id: number;
    message: string;
    createdAt: string;
  };

  unReadCount: number;
}

const Channel = (props: ChannelProps) => {
  const router = useRouter();
  const { channelId, name, imageUrl, lastChat, unReadCount } = props;

  return (
    <div
      className="flex shadow p-1 h-16 px-3"
      key={channelId}
      onClick={() => {
        router.push(`/channel/${channelId}`);
      }}
    >
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
        <div className="text-base">{lastChat?.message}</div>
      </div>

      <div className="py-2">
        <div className="text-sm text-gray h-5">
          {dateFormat(lastChat?.createdAt)}
        </div>
        <div className="flex justify-end">
          {/* {unReadCount > 0 && (
            <div className="text-sm text-white bg-red rounded-2xl text-right inline-block px-2 justify-end w-auto">
              {unReadCount}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Channel;
