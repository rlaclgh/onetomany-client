"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="h-16 absolute bottom-0 left-0 right-0 flex border-t border-solid border-gray-light">
      <Link
        href="/"
        className={`flex-1 h-16 flex justify-center items-center flex-col 
        ${pathname === "/" ? "bg-blue" : ""}
        `}
      >
        <Image src="/home.svg" width={24} height={24} alt="Home" />
        <div className="h-1" />
        <div className="text-sm">홈</div>
      </Link>

      <div className="border-r border-solid border-gray-light" />

      <Link
        href="/channel"
        className={`flex-1 h-16 flex justify-center items-center flex-col 
        ${pathname === "/channel" ? "bg-blue" : ""}
        `}
      >
        <Image src="/channel.svg" width={24} height={24} alt="Home" />
        <div className="h-1" />
        <div className="text-sm">채널</div>
      </Link>
      <div className="border-r border-solid border-gray-light" />

      <Link
        href="/settings"
        className={`flex-1 h-16 flex justify-center items-center flex-col 
        ${pathname === "/settings" ? "bg-blue" : ""}
        `}
      >
        <Image src="/setting.svg" width={24} height={24} alt="Home" />
        <div className="h-1" />
        <div className="text-sm">설정</div>
      </Link>
    </div>
  );
};

export default BottomNavigation;
