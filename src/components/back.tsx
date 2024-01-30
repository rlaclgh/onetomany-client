"use client";
import { useRouter } from "next/navigation";
import ArrowLeft from "@/public/arrow-left.svg";
const Back = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (window.history?.length) {
          router.back();
        } else {
          router.replace("/");
        }
      }}
    >
      <ArrowLeft width={24} height={24} color="black" />
    </div>
  );
};

export default Back;
