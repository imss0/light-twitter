import React from "react";
import useSWR from "swr";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Textarea from "../components/TextArea";
import TweetCard from "../components/TweetCard";
import TweetList from "../components/TweetList";

export default () => {
  const { data } = useSWR("/api/auth/me");
  return (
    <Layout title="LOUNGE">
      <div className="w-full relative mb-10">
        <Textarea
          id="textarea"
          placeholder={`What is happening, ${data?.nickname}?`}
        />
        <div className="absolute right-0 mb-5">
          <Button text="Post!" />
        </div>
      </div>
      <TweetList>
        <TweetCard nickname="sohyun" timestamp="1h ago" content="hello" />
        <TweetCard nickname="Jason" timestamp="2h ago" content="world" />
        <TweetCard nickname="Minion" timestamp="3h ago" content="????" />
      </TweetList>
    </Layout>
  );
};
