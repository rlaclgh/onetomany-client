import { usePathname } from "next/navigation";
import { useEffect } from "react";

const usePreviousPath = () => {
  const pathname = usePathname();

  useEffect(() => {
    const prev = localStorage.getItem("curr");
    const curr = pathname;

    localStorage.setItem("prev", prev);
    localStorage.setItem("curr", curr);

    if (!["/sign-in", "/sign-up"].includes(curr)) {
      localStorage.removeItem("goto");
    }
  }, [pathname]);
};

export default usePreviousPath;
