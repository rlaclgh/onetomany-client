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
import { toast } from "react-toastify";
import useLoginRequired from "@/hooks/use-login-required";

interface FormProps {
  name: string;

  description: string;

  imageUrl: string;
}

const CreateChatRoomForm = () => {
  const router = useRouter();
  const { loginRequired } = useLoginRequired();

  const { mutate: createChatRoom } = useCreateChatRoom({
    onSuccess: () => {
      toast.success("채팅방을 생성했습니다.");
      router.replace("/");
    },
    onError: (data) => {
      toast.error(data?.response?.data?.message);
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
        onClick={() =>
          loginRequired(() => {
            createChatRoom({
              name: getValues("name"),
              description: getValues("description"),
              imageUrl:
                getValues("imageUrl") ||
                "https://i.pinimg.com/564x/6a/95/83/6a958390de7924f68e1dfbd57d8c41d6.jpg",
            });
          })
        }
        disabled={!formState.isValid}
      />
    </>
  );
};

export default CreateChatRoomForm;
