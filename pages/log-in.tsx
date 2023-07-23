import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import Layout from "../components/Layout";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();

  const onValid = async (data: LoginForm) => {
    const request = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (request.status === 200) {
      toast.success("Successfully logged in");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
    if (request.status === 404) {
      toast.error("Email not exists");
    }
    if (request.status === 403) {
      toast.error("Wrong password");
    }
  };

  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  return (
    <Layout title="Log in">
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          {...register("email", { required: "Write your email please." })}
          label="Email"
          type="email"
          id="email"
        />
        <Input
          {...register("password", { required: "Write your password please." })}
          label="Password"
          type="password"
          id="password"
          required
        />
        <div className="mt-6">
          <Button size="large" text="Login" type="submit" />
        </div>
      </form>
      <div className="flex mt-12 text-sm">
        <div className=" text-gray-600 mr-2">Don't have an account?</div>
        <Link href="/create-account">
          <a>
            <div className="font-semibold text-blue-600 cursor-pointer">
              Create account
            </div>
          </a>
        </Link>
      </div>
      <Toaster />
    </Layout>
  );
}
