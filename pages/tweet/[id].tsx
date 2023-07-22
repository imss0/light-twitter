import React from "react";
import Link from "next/link";
import Detail from "../../components/Detail";
import Layout from "../../components/Layout";

export default function Tweet() {
  return (
    <Layout title="Tweet">
      <Link href="/">
        <svg
          className="h-6 w-6 absolute left-1 cursor-pointer"
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
      <Detail
        nickname="sohyun"
        timestamp="1h ago"
        content="hello"
        likes={35}
        isLiked={true}
      />
    </Layout>
  );
}
