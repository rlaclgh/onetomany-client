import { useGetChannels } from "@/query/channel";
import Channel from "./channel";

const Channels = () => {
  const { data: channels, isLoading } = useGetChannels();
  if (isLoading) return <></>;

  return (
    <>
      {channels.map((channel) => {
        return (
          <Channel
            key={channel?.id}
            channelId={channel?.id}
            name={channel?.chatRoom?.name}
            imageUrl={channel?.chatRoom?.imageUrl}
            lastChat={channel?.lastChat}
            unReadCount={channel?.unReadCount}
          />
        );
      })}
    </>
  );
};

export default Channels;
