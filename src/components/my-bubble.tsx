import { dateFormat } from "@/utils/date";
import { format } from "date-fns";

const MyBubble = (props: any) => {
  const { message } = props;
  return (
    <div className="items-end" id={message.id}>
      <div className="flex mt-2 mb-2 justify-end">
        <div className="items-end justify-end flex pr-2">
          {dateFormat(message?.createdAt)}
        </div>
        <div>
          <div className="pl-2 pt-2 pr-2 pb-1 bg-blue text-white rounded-2xl max-w-80 max-h-80 whitespace-pre-line">
            {message?.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBubble;
