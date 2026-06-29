"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("https://goalos-backend.onrender.com/goals")
      .then((res) => res.json())
      .then((data) => {
        setGoals(data);
      });

    fetch("https://goalos-backend.onrender.com/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Invalid Token") {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        setUser(data);

        fetch(`https://goalos-backend.onrender.com/user-goal/${data.id}`)
          .then((res) => res.json())
          .then((goalData) => {
            setSelectedGoal(goalData);
          });
      });
  }, []);

  const selectGoal = async (goalId: number) => {
    if (!user?.id) {
      alert("User not loaded");
      return;
    }

    const response = await fetch(
      "https://goalos-backend.onrender.com/user-goal",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          goal_id: goalId,
        }),
      }
    );

    const data = await response.json();

    alert(data.message);

    fetch(`https://goalos-backend.onrender.com/user-goal/${user.id}`)
      .then((res) => res.json())
      .then((goalData) => {
        setSelectedGoal(goalData);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      {user && (
        <div className="mb-8 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-3xl font-bold">
            Welcome, {user.name}
          </h2>

          <p className="text-gray-400 mt-2">
            {user.email}
          </p>

          <p className="text-gray-500 text-sm mt-1">
            {user.education}
          </p>

          <div className="flex gap-3 mt-4">
            <a
              href="/profile"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Profile
            </a>

            <a
              href="/career-ai"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              AI Counselor
            </a>

            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {selectedGoal && !selectedGoal.message && (
        <div className="mb-8 border border-green-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-2">
            My Goal
          </h2>

          <p className="text-xl font-semibold">
            {selectedGoal.goal_name}
          </p>

          <p className="text-gray-400">
            {selectedGoal.category}
          </p>

          <p className="mt-2">
            Progress: {selectedGoal.progress}%
          </p>

          <a
            href={`/roadmap/${selectedGoal.goal_id}`}
            className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Continue Roadmap
          </a>
        </div>
      )}

      <h1 className="text-5xl font-bold mb-8">
        Career Goals
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {goals.map((goal: any) => (
          <div
            key={goal.id}
            className="border border-gray-800 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {goal.goal_name}
            </h2>

            <p className="text-gray-400">
              {goal.category}
            </p>

            <button
              onClick={() => selectGoal(goal.id)}
              className="mt-4 bg-white text-black px-4 py-2 rounded-lg"
            >
              Select Goal
            </button>

            <a
              href={`/roadmap/${goal.id}`}
              className="block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
            >
              View Roadmap
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}