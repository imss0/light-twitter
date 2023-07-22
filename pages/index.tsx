import React from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Textarea from "../components/TextArea";
import TweetCard from "../components/TweetCard";
import TweetList from "../components/TweetList";

interface ContentForm {
  content: string;
}

interface TweetData {
  id: string;
  nickname: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default () => {
  const { data: user } = useSWR("/api/auth/me");
  const { data: tweets, mutate } = useSWR("/api/tweets");

  const { register, handleSubmit, reset } = useForm<ContentForm>();
  const onValid = async ({ content }: ContentForm) => {
    const request = await fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        content,
      }),
    });
    if (request.status === 201) {
      toast.success("posted!");
      reset();
      mutate();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="LOUNGE">
      <form onSubmit={handleSubmit(onValid)} className="w-full relative mb-10">
        <Textarea
          {...register("content", { required: "Please write something" })}
          id="textarea"
          placeholder={`What is happening, ${user?.nickname}?`}
        />
        <div className="absolute right-0 mb-5">
          <Button text="Post!" type="submit" />
        </div>
      </form>
      <TweetList>
        {tweets
          ?.sort(
            (a: TweetData, b: TweetData) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((tweet: TweetData) => (
            <Link href={`/tweet/${tweet.id}`} key={tweet.id}>
              <a className="w-full">
                <TweetCard
                  nickname={tweet.nickname}
                  timestamp={tweet.createdAt}
                  content={tweet.content}
                />
              </a>
            </Link>
          ))}
      </TweetList>
      <Toaster />
    </Layout>
  );
};
