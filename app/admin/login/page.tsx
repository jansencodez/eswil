"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import baseUrl from "../../../utils/baseUrl";
import useAlert from "@/hooks/useAlert";
import LoginForm from "@/components/Common/LoginForm";

function AdminLogin() {
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
      const response = await fetch(`${baseUrl}/admins/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        showAlert("login successful");
        router.push("/admin/dashboard");
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
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
        title="Admin Login"
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

export default AdminLogin;
