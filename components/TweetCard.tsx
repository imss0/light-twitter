import React, { FC, forwardRef } from "react";
import moment from "moment";

interface TweetCardProps {
  nickname: string;
  timestamp: string;
  content: string;
  [key: string]: any;
}

const TweetCard: FC<TweetCardProps> = forwardRef<
  HTMLDivElement,
  TweetCardProps
>(({ nickname, timestamp, content, ...rest }, ref) => {
  return (
    <div
      {...rest}
      ref={ref}
      className="w-full p-2.5 border-b border-gray-200 hover:bg-gray-200 cursor-pointer"
    >
      <div className="flex items-center">
        <p className="font-bold mr-2">{nickname}</p>
        <p className="text-gray-400 text-xs">{moment(timestamp).fromNow()}</p>
      </div>
      <div className="mt-0.5 overflow-hidden h-20">{content}</div>
    </div>
  );
});

export default TweetCard;
