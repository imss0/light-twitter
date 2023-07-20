import Link from "next/link";
import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Layout from "../components/Layout";

export default function CreateAccount() {
  return (
    <Layout title="Create Account">
      <Input label="Nickname" type="text" id="nickname" />
      <Input label="Email" type="email" id="email" />
      <Input
        label="Password"
        type="password"
        id="password"
        placeholder="8-character minimum"
        required
      />
      <div className="mt-6">
        <Button size="large" text="Create Account" />
      </div>
      <div className="flex mt-12 text-sm">
        <div className=" text-gray-600 mr-2">Already have an account?</div>
        <Link href="/log-in">
          <div className="font-semibold text-blue-600 cursor-pointer">
            Login
          </div>
        </Link>
      </div>
    </Layout>
  );
}
