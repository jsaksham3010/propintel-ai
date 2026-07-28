"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import DemoModal from "@/components/common/DemoModal";

export default function Hero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Background Blur */}
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-center justify-center px-6 text-center">
          {/* Badge */}
          <span className="mb-6 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-600">
            🚀 AI-Powered Real Estate Intelligence
          </span>

          {/* Heading */}
          <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Know Everything
            <br />
            <span className="text-blue-600">Before You Buy.</span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Make smarter real estate decisions with AI-powered property
            analysis, legal verification, investment insights and intelligent
            recommendations—all in one place.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <button
              onClick={() => setIsDemoOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-7 py-3 font-medium transition hover:bg-accent"
            >
              <PlayCircle size={18} />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="text-3xl font-bold">10K+</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Properties Analyzed
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="text-3xl font-bold">95%</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                AI Prediction Accuracy
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="text-3xl font-bold">24/7</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                AI Assistant Support
              </p>
            </div>
          </div>
        </div>
      </section>

      <DemoModal
        open={isDemoOpen}
        onOpenChange={setIsDemoOpen}
      />
    </>
  );
}