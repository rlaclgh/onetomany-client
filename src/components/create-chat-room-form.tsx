import { useForm } from "react-hook-form";
import TextInput from "./common/text-input";
import TextareaInput from "./common/textarea-input";
import { RULES } from "@/constants/rules";
import ImageInput from "./common/image-input";
import TextButton from "./common/text-button";

interface FormProps {
  name: string;

  description: string;

  imageUrl: string;
}

const CreateChatRoomForm = () => {
  const { control, formState } = useForm<FormProps>({
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },

    mode: "onChange",
    reValidateMode: "onChange",
  });
  return (
    <>
      <TextInput
        label="채팅방명"
        name="name"
        type="text"
        control={control}
        disabled={false}
        placeholder="채팅방명을 입력해주세요."
        rules={RULES.REQUIRED}
      />

      <TextareaInput
        label="채팅방 설명"
        name="description"
        control={control}
        disabled={false}
        placeholder="채팅방 설명을 입력해주세요."
        rules={RULES.REQUIRED}
      />

      <ImageInput
        label="이미지"
        name="imageUrl"
        control={control}
        disabled={false}
      />

      <div className="h-10" />

      <TextButton
        text="채팅방 생성"
        onClick={() => {}}
        disabled={!formState.isValid}
      />
    </>
  );
};

export default CreateChatRoomForm;
