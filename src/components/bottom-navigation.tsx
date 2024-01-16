import Image from "next/image";

const BottomNavigation = () => {
  return (
    <div className="h-16 absolute bottom-0 left-0 right-0 flex border-t border-solid border-gray-light">
      <div className="flex-1 h-16 flex justify-center items-center flex-col bg-blue">
        <Image src="/home.svg" width={24} height={24} alt="Home" />
        <div className="h-1" />
        <div className="text-sm">홈</div>
      </div>

      <div className="border-r border-solid border-gray-light" />

      <div className="flex-1 h-16 flex justify-center items-center flex-col">
        <Image src="/channel.svg" width={24} height={24} alt="Home" />
        <div className="h-1" />
        <div className="text-sm">채널</div>
      </div>
      <div className="border-r border-solid border-gray-light" />

      <div className="flex-1 h-16 flex justify-center items-center flex-col">
        <Image src="/setting.svg" width={24} height={24} alt="Home" />
        <div className="h-1" />
        <div className="text-sm">환경설정</div>
      </div>
    </div>
  );
};

export default BottomNavigation;
