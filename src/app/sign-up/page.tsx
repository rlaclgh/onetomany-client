import HeaderCenter from "@/components/common/header-center";
import Header from "@/components/header";
import SignUpForm from "@/components/sign-up-form";

const SignUp = () => {
  return (
    <>
      <Header renderCenter={() => <HeaderCenter>회원가입</HeaderCenter>} />

      <div className="h-10" />
      <div className="flex-1 px-4">
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUp;
