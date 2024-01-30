import { Control, Controller, RegisterOptions } from "react-hook-form";
import InputLabel from "./input-label";

interface TextareaInputProps {
  // input 상단에 보일 텍스트
  label: string;

  // react-hook-form 으로 관리하는 key 값
  name: string;

  // react-hook-form 의 controller
  control: Control<any>;

  // 입력가능 여부
  disabled: boolean;

  // placeholder
  placeholder?: string;

  // input validation
  rules?: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

const TextareaInput = (props: TextareaInputProps) => {
  const { label, name, control, disabled, rules, placeholder } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const hasError = !!fieldState?.error;
          const errorMessage = fieldState?.error?.message;
          return (
            <>
              <InputLabel label={label} name={name} />

              <div className="h-1" />

              <textarea
                className={`w-full h-28 p-3 border-solid border rounded outline-none text-sm
                ${hasError ? "border-red" : "border-gray-light"}
                resize-none
                `}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />

              {!hasError && <div className="h-4" />}
              {hasError && (
                <>
                  <div className="h-1" />
                  <div className="text-right h-3 text-sm text-red">
                    {errorMessage}
                  </div>
                </>
              )}
            </>
          );
        }}
      />
    </>
  );
};

export default TextareaInput;
