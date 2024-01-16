import ChatRoom from "@/components/chat-room";
import HeaderCenter from "@/components/common/header-center";
import Header from "@/components/header";

const MOCK = [
  {
    chatRoomId: 1,
    name: "제목1",
    description: "설명1",
    imageUrl:
      "https://i.pinimg.com/564x/6a/95/83/6a958390de7924f68e1dfbd57d8c41d6.jpg",
  },
  {
    chatRoomId: 2,
    name: "제목2",
    description: "설명2",
    imageUrl:
      "https://i.pinimg.com/564x/6a/95/83/6a958390de7924f68e1dfbd57d8c41d6.jpg",
  },
  {
    chatRoomId: 3,
    name: "제목3",
    description: "설명3",
    imageUrl:
      "https://i.pinimg.com/564x/6a/95/83/6a958390de7924f68e1dfbd57d8c41d6.jpg",
  },
  {
    chatRoomId: 4,
    name: "제목4",
    description: "설명4",
    imageUrl:
      "https://i.pinimg.com/564x/6a/95/83/6a958390de7924f68e1dfbd57d8c41d6.jpg",
  },
] as const;

export default function Home() {
  return (
    <>
      <Header renderCenter={() => <HeaderCenter>채팅방 찾기</HeaderCenter>} />

      {MOCK.map((mock) => {
        return <ChatRoom key={mock.chatRoomId} {...mock} />;
      })}
    </>
  );
}
