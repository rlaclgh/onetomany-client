import { Control, Controller, RegisterOptions } from "react-hook-form";
import InputLabel from "./input-label";
import Image from "next/image";

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

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: {} }) => {
          return (
            <>
              <InputLabel label={label} name={""} />

              <div className="h-1" />

              <div className="relative w-48 h-48 rounded-2xl border border-solid border-black shadow flex">
                <label
                  htmlFor={name}
                  className="relative flex w-full cursor-pointer"
                >
                  {!value && (
                    <Image
                      src={"/camera.svg"}
                      alt="카메라"
                      width={40}
                      height={40}
                      className="m-auto"
                    />
                  )}

                  {value && (
                    <Image
                      src={value}
                      alt="채팅방 이미지"
                      width={192}
                      height={192}
                    />
                  )}
                </label>

                <input
                  className="absolute top-0 left-0 right-0 bottom-0 w-0 h-0"
                  type="file"
                  accept="image/*"
                  id={name}
                />
              </div>
            </>
          );
        }}
      />
    </>
  );
};

export default ImageInput;
