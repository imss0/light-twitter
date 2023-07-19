import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/TextArea";

export default function Login() {
  return (
    <div>
      <h1>Log in page</h1>
      <Input label="Email" type="email" id="email" error={true} />
      <Input label="Password" type="password" id="password" required />
      <Textarea id="posting" />
      <Button size="large" text="Login" />
    </div>
  );
}
