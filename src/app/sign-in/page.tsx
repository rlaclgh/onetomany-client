import HeaderCenter from "@/components/common/header-center";
import Header from "@/components/header";
import SignInForm from "@/components/sign-in-form";

const SignIn = () => {
  return (
    <>
      <Header renderCenter={() => <HeaderCenter>로그인</HeaderCenter>} />

      <div className="h-10" />
      <div className="flex-1 px-4">
        <SignInForm />
      </div>
    </>
  );
};

export default SignIn;
