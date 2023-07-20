import React from "react";

interface TweetCardProps {
  nickname: string;
  timestamp: string;
  content: string;
}

export default function TweetCard({
  nickname,
  timestamp,
  content,
}: TweetCardProps) {
  return (
    <div className="w-full p-2.5 border-b border-gray-200 hover:bg-gray-200 cursor-pointer">
      <div className="flex items-center">
        <p className="font-bold mr-2">{nickname}</p>
        <p className="text-gray-400 text-xs">{timestamp}</p>
      </div>
      <div className="mt-0.5 overflow-hidden h-20">{content}</div>
    </div>
  );
}
