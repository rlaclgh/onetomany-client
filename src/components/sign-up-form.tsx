"use client";

import { useForm } from "react-hook-form";
import TextInput from "./common/text-input";
import { RULES } from "@/constants/rules";
import TextButton from "./common/text-button";
import { useSignUp } from "@/query/auth";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
interface FormProps {
  email: string;
  nickname: string;
  password: string;
  rePassword: string;
}

const SignUpForm = () => {
  const router = useRouter();
  const { mutate: signUp } = useSignUp({
    onSuccess: () => {
      toast.success("가입이 완료되었습니다.");
      router.replace("/sign-in");
    },
    onError: (data) => {
      toast.error(data?.response?.data?.message);
    },
  });
  const { control, getValues, formState } = useForm<FormProps>({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      rePassword: "",
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
        label="닉네임"
        name="nickname"
        type="text"
        control={control}
        disabled={false}
        rules={RULES.NICKNAME}
      />

      <TextInput
        label="비밀번호"
        name="password"
        type="password"
        control={control}
        disabled={false}
        rules={RULES.PASSWORD}
      />

      <TextInput
        label="비밀번호 확인"
        name="rePassword"
        type="password"
        control={control}
        disabled={false}
        rules={{
          validate: (rePassword: string) => {
            return (
              getValues("password") === rePassword || "비밀번호가 다릅니다."
            );
          },
        }}
      />

      <div className="h-10" />

      <TextButton
        text="회원가입"
        onClick={() => {
          signUp({
            email: getValues("email"),
            nickname: getValues("nickname"),
            password: getValues("password"),
            rePassword: getValues("rePassword"),
          });
        }}
        disabled={!formState.isValid}
      />
    </div>
  );
};

export default SignUpForm;
