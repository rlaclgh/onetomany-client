"use client";

import { useForm } from "react-hook-form";
import TextareaInput from "./common/textarea-input";
import { RULES } from "@/constants/rules";
import TextButton from "./common/text-button";
import { useCreateFeedback } from "@/query/feedback";
import { toast } from "react-toastify";

interface FormProps {
  description: string;
}

const ServiceDescription = () => {
  const { control, formState, getValues, setValue } = useForm<FormProps>({
    defaultValues: {
      description: "",
    },

    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { mutate: createFeedback } = useCreateFeedback({
    onSuccess: () => {
      toast.success("피드백을 제출했습니다.");
      setValue("description", "");
    },
    onError: () => {
      toast.error("에러가 발생했습니다.");
    },
  });

  return (
    <div className="flex items-center h-full flex-col">
      <div className="w-120">
        <div className="text-6xl mb-10 mt-10">onetomany</div>

        <div className="text-2xl my-2">1. 서비스 배경</div>

        <div className="text-lg my-1">
          아티스트와 팬의 프라이빗 메세지 서비스{" "}
          <a
            href="https://www.dear-u.co/pages/business_bubble.php"
            className="text-blue"
          >
            버블
          </a>
          에서 영감을 받아,
        </div>

        <div className="text-lg my-1">
          일대다의 비대칭 채팅을 아티스트와 팬들이 아닌 다른 관계에서도
        </div>

        <div className="text-lg my-1">활용할 수 있게 개발했습니다.</div>

        <div className="text-2xl my-2">2. 서비스 기능</div>

        <div className="text-lg my-1">개발 진행중</div>

        <div className="text-2xl my-2">3. 개발 소스코드</div>

        <div className="text-lg my-1">
          Client 코드는{" "}
          <a
            href="https://github.com/rlaclgh/onetomany-client"
            className="text-blue"
          >
            여기
          </a>
          에서 확인 가능합니다.
        </div>

        <div className="text-lg my-1">
          Server 코드는{" "}
          <a
            href="https://github.com/rlaclgh/onetomany-server"
            className="text-blue"
          >
            여기
          </a>
          에서 확인 가능합니다.
        </div>
        <div className="text-2xl my-2">4. 개발 과정</div>

        <div className="text-lg my-1">
          개발 과정은{" "}
          <a
            href="https://github.com/rlaclgh/onetomany-server"
            className="text-blue"
          >
            여기
          </a>
          에서 확인 가능합니다.
        </div>

        <div className="text-2xl my-2">5. 피드백</div>

        <TextareaInput
          label="피드백 내용"
          name="description"
          control={control}
          disabled={false}
          placeholder="피드백 내용을 입력해주세요."
          rules={RULES.REQUIRED}
        />
        <div className="h-2" />

        <TextButton
          text="피드백 제출"
          onClick={() => {
            createFeedback({ description: getValues("description") });
          }}
          disabled={!formState.isValid}
        />
      </div>
    </div>
  );
};

export default ServiceDescription;
