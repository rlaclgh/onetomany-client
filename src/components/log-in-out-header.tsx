import useRedirectToSignIn from "@/hooks/use-redirect-to-sign-in";
import { useGetMe } from "@/query/auth";

const LogInOutHeader = () => {
  const { redirect } = useRedirectToSignIn();
  const { data: me, isLoading } = useGetMe();

  if (isLoading) return <></>;

  if (me) return <div>로그아웃</div>;

  return (
    <div
      onClick={() => {
        redirect();
      }}
    >
      로그인
    </div>
  );
};

export default LogInOutHeader;
