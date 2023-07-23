import React, { useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Button from "@components/Button";
import Layout from "@components/Layout";
import Textarea from "@components/TextArea";
import TweetCard from "@components/TweetCard";
import TweetList from "@components/TweetList";

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
  const { data: user } = useSWR("/api/auth/me", null, {
    revalidateOnFocus: false,
  });
  const { data: tweets, mutate } = useSWR("/api/tweets", null, {
    revalidateOnFocus: false,
  });
  const router = useRouter();

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

  const onClick = async (id: string) => {
    const request = await fetch(`/api/tweet/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (request.status === 200) {
      router.push(`/tweet/${id}`);
    } else {
      toast.error("Something went wrong");
    }
  };

  const onLogout = async () => {
    const request = await fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (request.status === 200) {
      router.push("/log-in");
    } else {
      toast.error("Logout error");
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/log-in");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <>
      {user ? (
        <Layout title="LOUNGE">
          <div
            onClick={onLogout}
            className="h-6 w-6 absolute left-5 cursor-pointer text-gray-400 text-xs font-semibold"
          >
            Logout
          </div>
          <form
            onSubmit={handleSubmit(onValid)}
            className="w-full relative mb-10"
          >
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
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((tweet: TweetData) => (
                <TweetCard
                  onClick={() => onClick(tweet.id)}
                  key={tweet.id}
                  nickname={tweet.nickname}
                  timestamp={tweet.createdAt}
                  content={tweet.content}
                />
              ))}
          </TweetList>
          <Toaster />
        </Layout>
      ) : (
        <div>Please log in</div>
      )}
    </>
  );
};
