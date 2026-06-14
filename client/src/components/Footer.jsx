function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-8">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Community
              <span className="text-indigo-500">
                Connect
              </span>
            </h2>

            <p className="text-slate-400 mt-4 leading-7">
              Empowering citizens to report community
              issues and helping authorities resolve
              them efficiently.
            </p>

          </div>

          <div>

            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-slate-400">

              <li>Dashboard</li>
              <li>Report Issue</li>
              <li>My Issues</li>

            </ul>

          </div>

          <div>

            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <p className="text-slate-400">
              support@communityconnect.com
            </p>

            <p className="text-slate-400 mt-2">
              Helping communities stay connected.
            </p>

          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6">

          <p className="text-center text-slate-500">
            © 2026 CommunityConnect. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;