import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import Layout from "../components/Layout";

interface CreateAccountForm {
  nickname: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const { register, handleSubmit } = useForm<CreateAccountForm>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onValid = async (data: CreateAccountForm) => {
    if (!loading) {
      setLoading(true);
      const req = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (req.status === 200) {
        toast.error("Account Already Exists");
      }
      if (req.status === 201) {
        toast.success("Account Created");
        setTimeout(() => {
          router.push("/log-in");
        }, 3000);
      }
      setLoading(false);
    }
  };

  return (
    <Layout title="Create Account">
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          {...register("nickname", { required: "Write your nickname please." })}
          label="Nickname"
          type="text"
          id="nickname"
        />
        <Input
          {...register("email", { required: "Write your email please." })}
          label="Email"
          type="email"
          id="email"
        />
        <Input
          {...register("password", {
            required: "Write your password please.",
            minLength: {
              message: "Please write more than 8 characters.",
              value: 8,
            },
          })}
          label="Password"
          type="password"
          id="password"
          placeholder="8-character minimum"
          required
        />
        <div className="mt-6">
          <Button size="large" text="Create Account" type="submit" />
        </div>
        <div className="flex mt-12 text-sm">
          <div className=" text-gray-600 mr-2">Already have an account?</div>
          <Link href="/log-in">
            <a>
              <div className="font-semibold text-blue-600 cursor-pointer">
                Log in
              </div>
            </a>
          </Link>
        </div>
      </form>
      <Toaster />
    </Layout>
  );
}
