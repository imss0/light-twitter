import Link from "next/link";
import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Layout from "../components/Layout";

export default function Login() {
  return (
    <Layout title="Log in">
      <Input label="Email" type="email" id="email" />
      <Input label="Password" type="password" id="password" required />
      <div className="mt-6">
        <Button size="large" text="Login" />
      </div>
      <div className="flex mt-12 text-sm">
        <div className=" text-gray-600 mr-2">Don't have an account?</div>
        <Link href="/create-account">
          <div className="font-semibold text-blue-600 cursor-pointer">
            Create account
          </div>
        </Link>
      </div>
    </Layout>
  );
}
