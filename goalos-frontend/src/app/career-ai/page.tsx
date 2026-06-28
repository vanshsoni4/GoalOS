"use client";

import { useState } from "react";

export default function CareerAIPage() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState<any>(null);

  const getAdvice = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/career-advice",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills,
          interests,
        }),
      }
    );

    const data = await response.json();

    setResult(data);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        AI Career Counselor
      </h1>

      <div className="max-w-2xl">

        <input
          type="text"
          placeholder="Skills (Python, SQL, Excel)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-900 rounded-lg"
        />

        <input
          type="text"
          placeholder="Interests (Analytics, AI, Web Development)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-900 rounded-lg"
        />

        <button
          onClick={getAdvice}
          className="bg-green-600 px-6 py-3 rounded-lg"
        >
          Get Career Advice
        </button>

      </div>

      {result && (
        <div className="mt-8 border border-green-700 rounded-2xl p-6">
          <h2 className="text-3xl font-bold">
            {result.career}
          </h2>

          <p className="mt-3">
            {result.reason}
          </p>

          <h3 className="mt-6 text-xl font-semibold">
            Recommended Skills
          </h3>

          <ul className="list-disc ml-6 mt-2 space-y-2">
            {result.next_skills.map(
             (skill: string) => (
              <li
                key={skill}
                className="text-green-400"
           >
             {skill}
         </li>
    )
  )}
</ul>
        </div>
      )}
    </main>
  );
}