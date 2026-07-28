"use client";

import {
  TrendingUp,
  MapPin,
  IndianRupee,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";

interface AIReportProps {
  report?: {
    overallScore: number;
    investmentRating: string;
    marketValueEstimate: string;
    locationScore: number;
    riskLevel: string;
    pros: string[];
    cons: string[];
    recommendation: string;
  };
}

export default function AIReport({ report }: AIReportProps) {
  if (!report) {
    return (
      <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="text-indigo-600" size={28} />
          <h2 className="text-2xl font-bold">AI Investment Report</h2>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
          <Sparkles
            size={48}
            className="mx-auto mb-4 text-gray-300"
          />

          <h3 className="text-xl font-semibold text-gray-700">
            No AI Report Available
          </h3>

          <p className="mt-2 text-gray-500">
            Upload property images and click
            <span className="font-semibold">
              {" "}
              "Analyze with AI"
            </span>{" "}
            to generate a detailed investment report.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold">
          AI Investment Report
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl bg-green-50 p-5">
          <p className="text-sm text-gray-500">
            Overall Score
          </p>

          <h3 className="mt-2 text-4xl font-bold text-green-600">
            {report.overallScore}/100
          </h3>
        </div>

        <div className="rounded-2xl bg-blue-50 p-5">
          <TrendingUp className="mb-2 text-blue-600" />

          <p className="text-sm text-gray-500">
            Investment Rating
          </p>

          <h3 className="mt-2 text-lg font-semibold">
            {report.investmentRating}
          </h3>
        </div>

        <div className="rounded-2xl bg-purple-50 p-5">
          <MapPin className="mb-2 text-purple-600" />

          <p className="text-sm text-gray-500">
            Location Score
          </p>

          <h3 className="mt-2 text-lg font-semibold">
            {report.locationScore}/10
          </h3>
        </div>

        <div className="rounded-2xl bg-yellow-50 p-5">
          <IndianRupee className="mb-2 text-yellow-700" />

          <p className="text-sm text-gray-500">
            Estimated Market Value
          </p>

          <h3 className="mt-2 text-lg font-semibold">
            {report.marketValueEstimate}
          </h3>
        </div>

        <div className="rounded-2xl bg-red-50 p-5">
          <ShieldAlert className="mb-2 text-red-600" />

          <p className="text-sm text-gray-500">
            Risk Level
          </p>

          <h3 className="mt-2 text-lg font-semibold">
            {report.riskLevel}
          </h3>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-green-700">
            <CheckCircle2 size={22} />
            Strengths
          </h3>

          <ul className="space-y-3">
            {report.pros.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 text-green-600"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-red-700">
            <XCircle size={22} />
            Weaknesses
          </h3>

          <ul className="space-y-3">
            {report.cons.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
              >
                <XCircle
                  size={18}
                  className="mt-0.5 text-red-600"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
        <h3 className="mb-3 text-xl font-bold text-indigo-700">
          AI Recommendation
        </h3>

        <p className="leading-7 text-gray-700">
          {report.recommendation}
        </p>
      </div>
    </div>
  );
}