import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">
          GoalOS
        </h1>

        <div className="flex gap-4">

          <Link
            href="/login"
            className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-900"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:scale-105 transition"
          >
            Register
          </Link>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">

        <h1 className="text-7xl font-bold mb-6">
          GoalOS
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mb-10">
          Career Operating System for Students and Professionals.
          Discover career roadmaps, track progress, learn skills,
          get AI guidance, community recommendations and grow faster.
        </p>

        <div className="flex gap-4">

          <Link
            href="/register"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Get Started
          </Link>

          <Link
            href="/dashboard"
            className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-900 transition"
          >
            Explore Careers
          </Link>

        </div>

      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-8 pb-20">

        <div className="border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-3">
            AI Guidance
          </h2>

          <p className="text-gray-400">
            Get personalized career suggestions,
            learning paths and skill recommendations.
          </p>
        </div>

        <div className="border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Career Roadmaps
          </h2>

          <p className="text-gray-400">
            Step-by-step roadmaps for engineering,
            medicine, commerce, government jobs and more.
          </p>
        </div>

        <div className="border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Community Reviews
          </h2>

          <p className="text-gray-400">
            Learn from professionals and students who
            have already walked the path.
          </p>
        </div>

      </section>

    </main>
  );
}