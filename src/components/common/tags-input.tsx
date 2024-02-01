import { Control, Controller, RegisterOptions } from "react-hook-form";
import InputLabel from "./input-label";
import { useEffect, useRef, useState } from "react";
import { useCreateTag } from "@/query/tag";

interface TagsInputProps {
  // input 상단에 보일 텍스트
  label: string;

  // react-hook-form 으로 관리하는 key 값
  name: string;

  // react-hook-form 의 controller
  control: Control<any>;
}

const TagsInput = (props: TagsInputProps) => {
  const { label, name, control } = props;

  const [value, setValue] = useState("");

  const spanRef = useRef<any>();
  const inputRef = useRef<any>();

  const { mutateAsync: createTag } = useCreateTag();

  useEffect(() => {
    if (!spanRef) return;
    if (!spanRef.current) return;
    if (!inputRef) return;
    if (!inputRef.current) return;

    spanRef.current.innerText = inputRef.current.value;
  }, [value]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <>
              <InputLabel label={label} name={name} />
              <div className="h-1" />

              <div className="flex flex-wrap gap-2">
                {field.value.map((tag) => {
                  return (
                    <div
                      className="bg-blue p-1 rounded-xl flex justify-center items-center"
                      key={tag.id}
                    >
                      <div className="text-sm text-white">{tag.name}</div>
                    </div>
                  );
                })}

                <div className="w-min relative max-w-[100%]">
                  <span
                    ref={spanRef}
                    id="size-calibration"
                    className="whitespace-pre pr-4 pl-4 max-w-[100%] min-w-20"
                    style={{ visibility: "hidden" }}
                  ></span>
                  <input
                    id="autosized-input"
                    className="rounded-lg border border-solid absolute left-0 w-[100%] pl-2 pt-1 pb-1 pr-2 text-sm max-w-[100%] min-w-20"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    placeholder="태그 입력"
                    maxLength={20}
                    ref={inputRef}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        if (e.nativeEvent.isComposing === false) {
                          if (value.trim() !== "") {
                            const tag = await createTag({ name: value.trim() });

                            field.onChange([...field.value, tag.data]);
                          }
                          setValue("");
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <div className="h-4" />
            </>
          );
        }}
      />
    </>
  );
};

export default TagsInput;
