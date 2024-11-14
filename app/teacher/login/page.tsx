"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import baseUrl from "../../../utils/baseUrl";
import LoginForm from "@/components/Common/LoginForm";
import useAlert from "@/hooks/useAlert";

function TeacherLogin() {
  const { Alert, showAlert } = useAlert();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/teachers/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("teacherToken", data.token);
        showAlert("login successful");
        router.push("/teacher/dashboard");
      } else {
        setError(data.error);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showAlert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <LoginForm
        title="Teacher Login"
        error={error}
        onSubmit={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <Alert />
    </>
  );
}

export default TeacherLogin;
