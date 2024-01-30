"use client";
import useLoginRequired from "@/hooks/use-login-required";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import Home from "@/public/home.svg";
import Channel from "@/public/channel.svg";
import Setting from "@/public/setting.svg";
const NO_BOTTOM_PATH = new Set([
  // 로그인
  "/sign-in",
  // 회원가입
  "/sign-up",
]);

const BottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { loginRequired } = useLoginRequired();

  const isSelelcted = (path: string) => {
    if (pathname === path) return true;
    return false;
  };

  if (NO_BOTTOM_PATH.has(pathname)) return <></>;

  return (
    <div className="h-16 absolute bottom-0 left-0 right-0 flex border-t border-solid border-gray-light">
      <Link
        href="/"
        className={`flex-1 h-16 flex justify-center items-center flex-col 
        ${isSelelcted("/") ? "bg-blue" : ""}
        `}
      >
        {/* <Image
          src="/home.svg"
          width={24}
          height={24}
          alt="Home"
          color="white"
        /> */}
        <Home
          width={24}
          height={24}
          color={isSelelcted("/") ? "white" : "black"}
        />

        <div className="h-1" />
        <div
          className={`text-sm ${
            isSelelcted("/") ? "text-white" : "text-black"
          }`}
        >
          홈
        </div>
      </Link>

      <div className="border-r border-solid border-gray-light" />

      <div
        className={`flex-1 h-16 flex justify-center items-center flex-col 
        ${pathname === "/channel" ? "bg-blue" : ""}
        cursor-pointer
        `}
        onClick={() =>
          loginRequired(() => {
            router.push("/channel");
          })
        }
      >
        {/* <Image src="/channel.svg" width={24} height={24} alt="Home" /> */}

        <Channel
          width={24}
          height={24}
          color={isSelelcted("/channel") ? "white" : "black"}
        />
        <div className="h-1" />
        <div
          className={`text-sm ${
            isSelelcted("/channel") ? "text-white" : "text-black"
          }`}
        >
          채널
        </div>
      </div>
      <div className="border-r border-solid border-gray-light" />

      <div
        className={`flex-1 h-16 flex justify-center items-center flex-col 
        ${pathname === "/settings" ? "bg-blue" : ""}
        cursor-pointer
        `}
        onClick={() =>
          loginRequired(() => {
            router.push("/settings");
          })
        }
      >
        <Setting
          width={24}
          height={24}
          color={isSelelcted("/settings") ? "white" : "black"}
        />
        <div className="h-1" />
        <div
          className={`text-sm ${
            isSelelcted("/settings") ? "text-white" : "text-black"
          }`}
        >
          설정
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
