import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import community1 from "../assets/community1.jpg";
import community2 from "../assets/community2.jpg";

function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-6xl font-bold mb-6">
            CommunityConnect
          </h1>

          <p className="text-xl max-w-3xl mx-auto mb-10">
            Report local issues, track complaint progress,
            and help create a cleaner and safer community.
          </p>

          {!user ? (
            <div className="flex justify-center gap-4">
              <Link
                to="/signup"
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-white px-6 py-3 rounded-lg"
              >
                Login
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
            >
              Go To Dashboard
            </Link>
          )}

        </div>
      </section>

      {/* Section 1 */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why CommunityConnect?
              </h2>

              <p className="text-lg text-gray-700 leading-8">
                Citizens often face issues like road damage,
                garbage accumulation, water leakage, and
                broken street lights. Unfortunately, many of
                these problems remain unresolved because
                there is no simple way to report and track them.
              </p>

              <p className="text-lg text-gray-700 leading-8 mt-4">
                CommunityConnect provides a centralized
                platform where complaints can be submitted,
                monitored, and resolved efficiently.
              </p>
            </div>

            <img
              src={community1}
              alt="Community"
              className="rounded-2xl shadow-xl"
            />

          </div>

        </div>
      </section>

      {/* Section 2 */}
      <section className="py-24 bg-indigo-50">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <img
              src={community2}
              alt="Issue Reporting"
              className="rounded-2xl shadow-xl"
            />

            <div>
              <h2 className="text-4xl font-bold mb-6">
                Report Issues With Evidence
              </h2>

              <p className="text-lg text-gray-700 leading-8">
                Upload photos along with issue details,
                location information, and category selection.
              </p>

              <p className="text-lg text-gray-700 leading-8 mt-4">
                Images provide better context to authorities
                and help speed up issue verification and
                resolution.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-cyan-50">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            What You Can Report
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-xl mb-3">
                Road Damage
              </h3>

              <p>
                Report potholes and damaged roads.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-xl mb-3">
                Garbage Issues
              </h3>

              <p>
                Report waste accumulation problems.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-xl mb-3">
                Water Leakage
              </h3>

              <p>
                Notify authorities about leakage issues.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-xl mb-3">
                Street Lights
              </h3>

              <p>
                Report damaged street lights.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white py-24">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold mb-6">
            Make Your Community Better
          </h2>

          <p className="text-lg text-gray-300 mb-8">
            Report issues, track progress, and contribute
            towards a cleaner and safer neighborhood.
          </p>

          {!user && (
            <Link
              to="/signup"
              className="bg-cyan-500 px-8 py-4 rounded-lg font-semibold"
            >
              Join CommunityConnect
            </Link>
          )}

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10">

        <div className="max-w-6xl mx-auto text-center">

          <h3 className="text-2xl font-bold">
            CommunityConnect
          </h3>

          <p className="text-gray-400 mt-3">
            Connecting citizens and authorities through technology.
          </p>

          <p className="text-gray-500 mt-5">
            © 2026 CommunityConnect
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;