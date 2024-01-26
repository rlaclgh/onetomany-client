import { usePathname, useRouter } from "next/navigation";

const useRedirectToSignIn = () => {
  const router = useRouter();
  const pathname = usePathname();

  const redirect = () => {
    localStorage.setItem("goto", pathname);
    return router.push("/sign-in");
  };

  return { redirect };
};

export default useRedirectToSignIn;
