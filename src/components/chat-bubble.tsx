import { useGetMe } from "@/query/auth";
import MyBubble from "./my-bubble";
import OtherBubble from "./other-bubble";

const ChatBubble = (props: any) => {
  const { message } = props;

  const { data: me, isLoading } = useGetMe();

  if (me?.id === message?.sender?.id) return <MyBubble message={message} />;
  return <OtherBubble message={message} />;
};

export default ChatBubble;
