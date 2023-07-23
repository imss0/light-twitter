import React from "react";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import Layout from "@components/Layout";

export default function Tweet() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/api/tweet/${id}`);
  const { data: like, mutate } = useSWR(`/api/tweet/like/${id}`);

  const toggleLiked = async () => {
    try {
      const request = await fetch(`/api/tweet/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (request.status === 201) {
        mutate();
      }
    } catch (error) {
      console.error("Error while toggling like:", error);
    }
  };

  return (
    <>
      {data ? (
        <Layout title="Tweet">
          <Link href="/">
            <svg
              className="h-6 w-6 absolute left-5 cursor-pointer"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              ></path>
            </svg>
          </Link>
          <div className="w-full p-2">
            <div>
              <p className="font-bold mr-2">{data.user.nickname}</p>
              <div className="mt-2 min-h-[96px]">{data.content}</div>
              <p className="text-gray-400 text-sm">
                {moment(data.createdAt).format("LT")}
                {" · "}
                {moment(data.createdAt).format("ll")}
              </p>
            </div>
            <div className="mt-4 flex justify-between border-y border-gray-300 py-4">
              <div>
                <span className="font-bold">{like?.likeCount}</span>
                <span className="ml-1.5 text-gray-500">Likes</span>
              </div>
              <svg
                onClick={toggleLiked}
                className={`w-6 h-6 mr-2 cursor-pointer ${
                  like?.isLiked ? "text-rose-500" : "text-gray-500"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
              </svg>
            </div>
          </div>
        </Layout>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
