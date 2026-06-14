import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import community1 from "../assets/community1.jpg";
import community2 from "../assets/community2.jpg";

function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-950 text-white">

      {/* Hero */}
      <section className="bg-slate-950 border-b border-slate-800 py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-6xl font-bold mb-6">
            CommunityConnect
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Report local issues, track complaint progress,
            and help create a cleaner and safer community.
          </p>

          {!user ? (
            <div className="flex justify-center gap-4">

              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-slate-700 hover:border-indigo-500 hover:text-indigo-400 px-6 py-3 rounded-lg transition"
              >
                Login
              </Link>

            </div>
          ) : (
            <Link
              to="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Go To Dashboard
            </Link>
          )}

        </div>
      </section>

      {/* Section 1 */}
      <section className="py-24 bg-slate-950">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>

              <h2 className="text-4xl font-bold mb-6">
                Why CommunityConnect?
              </h2>

              <p className="text-lg text-slate-400 leading-8">
                Citizens often face issues like road damage,
                garbage accumulation, water leakage, and
                broken street lights. Unfortunately, many of
                these problems remain unresolved because
                there is no simple way to report and track them.
              </p>

              <p className="text-lg text-slate-400 leading-8 mt-4">
                CommunityConnect provides a centralized
                platform where complaints can be submitted,
                monitored, and resolved efficiently.
              </p>

            </div>

            <img
              src={community1}
              alt="Community"
              className="rounded-2xl shadow-xl border border-slate-800"
            />

          </div>

        </div>

      </section>

      {/* Section 2 */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <img
              src={community2}
              alt="Issue Reporting"
              className="rounded-2xl shadow-xl border border-slate-800"
            />

            <div>

              <h2 className="text-4xl font-bold mb-6">
                Report Issues With Evidence
              </h2>

              <p className="text-lg text-slate-400 leading-8">
                Upload photos along with issue details,
                location information, and category selection.
              </p>

              <p className="text-lg text-slate-400 leading-8 mt-4">
                Images provide better context to authorities
                and help speed up issue verification and
                resolution.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="py-24 bg-slate-950">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            What You Can Report
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-indigo-500 transition">
              <h3 className="font-bold text-xl mb-3">
                Road Damage
              </h3>

              <p className="text-slate-400">
                Report potholes and damaged roads.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-indigo-500 transition">
              <h3 className="font-bold text-xl mb-3">
                Garbage Issues
              </h3>

              <p className="text-slate-400">
                Report waste accumulation problems.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-indigo-500 transition">
              <h3 className="font-bold text-xl mb-3">
                Water Leakage
              </h3>

              <p className="text-slate-400">
                Notify authorities about leakage issues.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-indigo-500 transition">
              <h3 className="font-bold text-xl mb-3">
                Street Lights
              </h3>

              <p className="text-slate-400">
                Report damaged street lights.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-slate-900 border-t border-slate-800 text-white py-24">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold mb-6">
            Make Your Community Better
          </h2>

          <p className="text-lg text-slate-400 mb-8">
            Report issues, track progress, and contribute
            towards a cleaner and safer neighborhood.
          </p>

          {!user && (
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg font-semibold transition"
            >
              Join CommunityConnect
            </Link>
          )}

        </div>

      </section>

    </div>
  );
}

export default Home;