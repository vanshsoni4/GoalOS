export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-2">
            Career Goals
          </h2>

          <p className="text-gray-400">
            Select and manage your career roadmap.
          </p>
        </div>

        <div className="border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-2">
            Progress Tracker
          </h2>

          <p className="text-gray-400">
            Track completed milestones and skills.
          </p>
        </div>

        <div className="border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-2">
            AI Counselor
          </h2>

          <p className="text-gray-400">
            Get AI-powered career guidance.
          </p>
        </div>

      </div>

    </main>
  );
}