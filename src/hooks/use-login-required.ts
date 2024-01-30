"use client";

import { useGetMe } from "@/query/auth";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useLoginRequired = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isError, isSuccess } = useGetMe();

  const loginRequired = (fn: () => any) => {
    if (isLoading) return;
    if (isError) {
      localStorage.setItem("goto", pathname);
      toast.error("로그인 후 이용이 가능합니다.");
      return router.push("/sign-in");
    }

    if (isSuccess) {
      fn();
    }
  };
  return { loginRequired };
};

export default useLoginRequired;
