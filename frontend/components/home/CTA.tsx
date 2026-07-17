import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-16 text-center text-white shadow-2xl md:px-16">

          <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            🚀 Start Your Journey Today
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Ready to Make Smarter
            <br />
            Real Estate Decisions?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Analyze properties, verify legal documents, assess investment
            potential, and make confident decisions—all powered by AI.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-blue-700 transition hover:scale-105">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="rounded-xl border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10">
              Learn More
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-blue-100">
            <span>✔ AI Powered</span>
            <span>✔ Secure Platform</span>
            <span>✔ Fast Analysis</span>
            <span>✔ Smart Decisions</span>
          </div>

        </div>
      </div>
    </section>
  );
}