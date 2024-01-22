"use client";

import { useForm } from "react-hook-form";
import TextInput from "./common/text-input";
import { RULES } from "@/constants/rules";
import TextButton from "./common/text-button";
import { useSignIn } from "@/query/auth";
import { useRouter } from "next/navigation";

interface FormProps {
  email: string;
  password: string;
}

const SignInForm = () => {
  const router = useRouter();
  const { mutate: signIn } = useSignIn({
    onSuccess: ({ data }) => {
      localStorage.setItem("accessToken", data.token);
      const goto = localStorage.getItem("goto");
      if (goto) {
        router.replace(goto);
      } else {
        router.replace("/");
      }
    },
    onError: () => {
      alert("에러 발생!");
    },
  });

  const { control, formState, getValues } = useForm<FormProps>({
    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <div>
      <TextInput
        label="이메일"
        name="email"
        type="text"
        control={control}
        disabled={false}
        rules={RULES.EMAIL}
      />

      <TextInput
        label="비밀번호"
        name="password"
        type="password"
        control={control}
        disabled={false}
        rules={RULES.PASSWORD}
      />

      <div className="h-10" />

      <TextButton
        text="로그인"
        onClick={() => {
          signIn({
            email: getValues("email"),
            password: getValues("password"),
          });
        }}
        disabled={!formState.isValid}
      />

      <div className="h-4" />
      <TextButton
        text="회원가입"
        onClick={() => {
          router.push("/sign-up");
        }}
        disabled={false}
      />
    </div>
  );
};

export default SignInForm;
