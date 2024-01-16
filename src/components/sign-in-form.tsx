"use client";

import { useForm } from "react-hook-form";
import TextInput from "./common/text-input";
import { RULES } from "@/constants/rules";
import TextButton from "./common/text-button";

interface FormProps {
  email: string;
  password: string;
}

const SignInForm = () => {
  const { control, formState } = useForm<FormProps>({
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
        onClick={() => {}}
        disabled={!formState.isValid}
      />
    </div>
  );
};

export default SignInForm;
