"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState([]);
  const [progress, setProgress] = useState<any>(null);

  const params = useParams();
  const id = params.id;

  const loadProgress = () => {
    fetch("http://127.0.0.1:8000/progress/1")
      .then((res) => res.json())
      .then((data) => {
        setProgress(data);
      });
  };

  useEffect(() => {
    if (!id) return;

    fetch(`http://127.0.0.1:8000/roadmap/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRoadmap(data);
      });

    loadProgress();
  }, [id]);

  const markComplete = async (roadmapNodeId: number) => {
    const response = await fetch(
      "http://127.0.0.1:8000/progress",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          roadmap_node_id: roadmapNodeId,
        }),
      }
    );

    const data = await response.json();

    alert(JSON.stringify(data));

    loadProgress();
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        Career Roadmap
      </h1>

      {progress && (
        <div className="mb-8 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Progress Tracker
          </h2>

          <p>
            Completed: {progress.completed} / {progress.total}
          </p>

          <p>
            Progress: {progress.percentage}%
          </p>

          <div className="w-full bg-gray-800 rounded-full h-4 mt-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{
                width: `${progress.percentage}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="space-y-6">

        {roadmap.map((item: any) => (
          <div
            key={item.step}
            className="border border-gray-800 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold">
              Step {item.step}: {item.title}
            </h2>

            <p className="text-gray-400 mt-2">
              {item.description}
            </p>

            <button
              onClick={() => markComplete(item.step)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Mark Complete
            </button>

          </div>
        ))}

      </div>

    </main>
  );
}