import { usePathname, useRouter } from "next/navigation";

const useRedirectToSignIn = () => {
  const router = useRouter();
  const pathname = usePathname();

  const redirect = () => {
    alert("로그인 후 이용해주세요.");
    localStorage.setItem("goto", pathname);
    return router.push("/sign-in");
  };

  return { redirect };
};

export default useRedirectToSignIn;
