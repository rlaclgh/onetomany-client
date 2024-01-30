import { Controller, useForm } from "react-hook-form";
import TextInput from "./common/text-input";
import TextButton from "./common/text-button";
import { Client } from "@stomp/stompjs";
import { useParams } from "next/navigation";
import { MutableRefObject, useCallback, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface FormProps {
  message: string;
  imageUrl: string;
}

interface ChatInputFormProps {
  client: Client;
  bottomRef: MutableRefObject<HTMLDivElement>;
}

const ChatInputForm = (props: ChatInputFormProps) => {
  const { client, bottomRef } = props;
  const params = useParams();

  const textareaTag = useRef<any>();

  const { control, formState, getValues, setValue } = useForm<FormProps>({
    defaultValues: {
      message: "",
      imageUrl: "",
    },

    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <>
      <div className="flex border-t border-gray-light border-solid pt-2 pb-2">
        {/* <div className="flex absolute bottom-0 left-0 right-0 border-t border-gray-light border-solid"> */}
        <Controller
          name="message"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <TextareaAutosize
                maxRows={1}
                className="flex-1 outline-none resize-none h-10 text-base bg-gray-light mr-2 ml-2 pr-2 pl-2 rounded-lg p-2"
                placeholder="메시지를 입력해주세요."
                {...field}
              />
            );
          }}
        />

        {/* <textarea
          ref={textareaTag}
          className="flex-1 outline-none border-solid border resize-none h-8 text-base p-1"
          onKeyUp={() => handleResizeHeight()}
          onKeyDown={() => handleResizeHeight()}
        /> */}
        <div
          className="justify-end items-end flex pb-2 pr-2"
          onClick={() => {
            client.publish({
              destination: `/ws/chat.${params.channelId}`,
              body: JSON.stringify({
                message: getValues("message"),
              }),
            });
            setValue("message", "");

            // bottomRef?.current?.scrollIntoView({
            //   block: "end",
            //   inline: "nearest",
            //   behavior: "smooth",
            // });
          }}
        >
          전송
        </div>
      </div>
    </>
  );
};

export default ChatInputForm;
