import { dateFormat } from "@/utils/date";

const OtherBubble = (props: any) => {
  const { message } = props;
  return (
    <>
      <div className="mt-2">{message?.sender?.nickname}</div>
      <div className="flex" id={message.id}>
        <div>
          <div className="pl-2 pt-2 pr-2 pb-1 bg-slate-200 rounded-2xl max-w-80 max-h-80 whitespace-pre-line text-base">
            {message?.message}
          </div>
        </div>
        <div className="items-end justify-end flex pl-2">
          {dateFormat(message?.createdAt)}
        </div>
      </div>
    </>
  );
};

export default OtherBubble;
