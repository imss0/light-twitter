import React from "react";

interface TweetListProps {
  children: React.ReactNode;
}

export default function TweetList({ children }: TweetListProps) {
  return (
    <div className="flex flex-col items-center  w-full mt-3  border-t border-gray-200">
      {children}
    </div>
  );
}
