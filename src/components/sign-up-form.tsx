"use client";

import { useForm } from "react-hook-form";
import TextInput from "./common/text-input";
import { RULES } from "@/constants/rules";
import TextButton from "./common/text-button";

interface FormProps {
  email: string;
  password: string;
  rePassword: string;
}

const SignUpForm = () => {
  const { control, getValues, formState } = useForm<FormProps>({
    defaultValues: {
      email: "",
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
        onClick={() => {}}
        disabled={!formState.isValid}
      />
    </div>
  );
};

export default SignUpForm;
