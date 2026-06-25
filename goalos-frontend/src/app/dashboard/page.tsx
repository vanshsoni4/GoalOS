"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/goals")
      .then((res) => res.json())
      .then((data) => {
        setGoals(data);
      });
  }, []);

  const selectGoal = async (goalId: number) => {
    const response = await fetch(
      "http://127.0.0.1:8000/user-goal",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          goal_id: goalId,
        }),
      }
    );

    const data = await response.json();

    alert(JSON.stringify(data));
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">

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

          </div>
        ))}

      </div>

    </main>
  );
}