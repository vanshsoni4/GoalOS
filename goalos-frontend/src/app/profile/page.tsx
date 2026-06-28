"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("http://127.0.0.1:8000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        My Profile
      </h1>

      {user && (
        <div className="border border-gray-800 rounded-2xl p-8 max-w-2xl">

          <h2 className="text-3xl font-bold mb-4">
            {user.name}
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Age:</strong> {user.age}
            </p>

            <p>
              <strong>Education:</strong> {user.education}
            </p>

            <p>
              <strong>User ID:</strong> {user.id}
            </p>

          </div>

        </div>
      )}

    </main>
  );
}