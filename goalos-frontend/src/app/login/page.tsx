"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    alert(JSON.stringify(data));

    console.log("LOGIN RESPONSE:", data);

    if (data.access_token) {
      localStorage.setItem(
        "token",
        data.access_token
      );

      alert("Token Saved");

      window.location.href = "/dashboard";
    } else {
      alert("No access token received");
    }

  } catch (error) {
    console.error(error);
    alert("Login Failed");
  }
};

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-900 text-white rounded-lg border border-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-900 text-white rounded-lg border border-gray-700"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Login
        </button>

      </div>
    </main>
  );
}