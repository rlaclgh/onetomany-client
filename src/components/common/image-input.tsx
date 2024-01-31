import { Control, Controller, RegisterOptions } from "react-hook-form";
import InputLabel from "./input-label";
import Image from "next/image";

import Xmark from "@/public/x-mark.svg";
import Spinner from "./spinner";
import { useCreatePreSignedUrl } from "@/query/image";
import axios from "axios";

interface ImageInputProps {
  // input 상단에 보일 텍스트
  label: string;

  // react-hook-form 으로 관리하는 key 값
  name: string;

  // react-hook-form 의 controller
  control: Control<any>;

  // 입력가능 여부
  disabled: boolean;

  // input validation
  rules?: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}
const ImageInput = (props: ImageInputProps) => {
  const { label, name, control, disabled, rules } = props;

  const { mutateAsync: createPreSignedUrl } = useCreatePreSignedUrl();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: {} }) => {
        return (
          <>
            <InputLabel label={label} name={""} />

            <div className="h-1" />

            <div className="flex">
              <div className="relative w-44 h-44 rounded-2xl border border-solid border-gray-light shadow flex">
                <label
                  htmlFor={name}
                  className="relative flex w-full cursor-pointer"
                >
                  <Image
                    src={"/camera.svg"}
                    alt="카메라"
                    width={40}
                    height={40}
                    className="m-auto"
                  />
                </label>

                <input
                  className="absolute top-0 left-0 right-0 bottom-0 w-0 h-0"
                  type="file"
                  accept="image/*"
                  id={name}
                  onChange={async (e) => {
                    const file: File = e.target.files[0];

                    const objectURL = URL.createObjectURL(file);
                    onChange(objectURL);

                    const result = await createPreSignedUrl({
                      contentType: file.type,
                    });

                    try {
                      await axios.put(result.data.url, file, {
                        headers: {
                          "Content-Type": file.type,
                        },
                        // onUploadProgress: (progressEvent) => {
                        //   const percentCompleted = Math.round(
                        //     (progressEvent.loaded * 100) / progressEvent.total
                        //   );
                        // },
                      });

                      onChange(result?.data?.url.split("?X")[0]);
                    } catch (error) {
                      console.log("🚀 ~ onChange={ ~ error:", error);
                    }
                  }}
                />
              </div>

              <div className="w-4" />

              {value && (
                <div className="w-44 h-44 rounded-2xl flex relative">
                  <Image
                    src={value}
                    alt="채팅방 이미지"
                    width={192}
                    height={192}
                  />

                  {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                    <Spinner />
                  </div> */}

                  <Xmark
                    color="white"
                    width={16}
                    height={16}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red"
                    onClick={() => {
                      onChange("");
                    }}
                  />
                </div>
              )}
            </div>
            <div className="h-4" />
          </>
        );
      }}
    />
  );
};

export default ImageInput;
