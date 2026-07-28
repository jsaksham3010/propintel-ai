"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  MapPin,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

import {
  getDashboardStats,
  RecentReport,
} from "@/services/dashboardService";

export default function AIReports() {
  const [reports, setReports] = useState<RecentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);

        const data = await getDashboardStats();

        setReports(data.recentReports || []);
      } catch (err) {
        console.error("Failed to load AI reports:", err);
        setError("Unable to load AI reports.");
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="h-72 animate-pulse rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
        <AlertCircle size={18} />
        {error}
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              AI Inspection Reports
            </h2>
          </div>

          <p className="mt-1 text-gray-500">
            Latest Gemini AI property analysis
          </p>
        </div>

        <Link
          href="/reports"
          className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
        >
          View Reports
          <ArrowRight size={18} />
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-gray-500 shadow-sm">
          No AI reports available.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {reports.map((report) => (
            <div
              key={report.id}
              className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {report.title}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-gray-500">
                <MapPin size={16} />
                <span>{report.city}</span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Overall AI Score
                  </p>

                  <p className="text-3xl font-bold text-blue-600">
                    {report.overallScore}%
                  </p>
                </div>

                <div className="rounded-xl bg-blue-100 p-3">
                  <Sparkles className="text-blue-600" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Investment Rating
                  </span>

                  <span className="font-semibold text-green-600">
                    {report.investmentRating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-500">
                    <ShieldCheck size={16} />
                    Risk Level
                  </span>

                  <span
                    className={`font-semibold ${
                      report.riskLevel?.toLowerCase() === "low"
                        ? "text-green-600"
                        : report.riskLevel?.toLowerCase() === "medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {report.riskLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Analyzed On
                  </span>

                  <span className="font-medium text-gray-900">
                    {new Date(report.analyzedAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>

              <Link
                href={`/properties/${report.id}`}
                className="mt-6 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
              >
                View Full Report
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}