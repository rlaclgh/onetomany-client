import { useForm } from "react-hook-form";
import TextInput from "./common/text-input";
import TextareaInput from "./common/textarea-input";
import { RULES } from "@/constants/rules";
import ImageInput from "./common/image-input";
import TextButton from "./common/text-button";
import { useCreateChatRoom } from "@/query/chat-room";
import { useRouter } from "next/navigation";
import useRedirectToSignIn from "@/hooks/use-redirect-to-sign-in";
import { useCreatePreSignedUrl } from "@/query/image";

interface FormProps {
  name: string;

  description: string;

  imageUrl: string;
}

const CreateChatRoomForm = () => {
  const router = useRouter();
  const { redirect } = useRedirectToSignIn();

  const { mutate: createChatRoom } = useCreateChatRoom({
    onSuccess: () => {
      alert("채팅방을 생성했습니다.");
      router.replace("/");
    },
    onError: (data) => {
      const errorCode = data?.response?.data?.code;

      if (errorCode === "UNAUTHORIZED") {
        redirect();
      }
    },
  });
  const { control, formState, getValues } = useForm<FormProps>({
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
        onClick={() => {
          createChatRoom({
            name: getValues("name"),
            description: getValues("description"),
            imageUrl: getValues("imageUrl"),
          });
        }}
        disabled={!formState.isValid}
      />
    </>
  );
};

export default CreateChatRoomForm;
