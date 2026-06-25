"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            age: Number(age),
            education,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      alert(data.message || "Registration Complete");

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-900 rounded-lg border border-gray-700"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-900 rounded-lg border border-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-900 rounded-lg border border-gray-700"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-900 rounded-lg border border-gray-700"
        />

        <input
          type="text"
          placeholder="Education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="w-full p-3 mb-6 bg-gray-900 rounded-lg border border-gray-700"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold"
        >
          Register
        </button>

      </div>
    </main>
  );
}