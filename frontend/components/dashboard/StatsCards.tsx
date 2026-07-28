"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  FileText,
  Star,
  Clock,
  AlertCircle,
} from "lucide-react";

import { getDashboardStats } from "@/services/dashboardService";

interface DashboardStats {
  totalProperties: number;
  aiReports: number;
  averageScore: number;
  pendingAnalysis: number;
}

export default function StatsCards() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    aiReports: 0,
    averageScore: 0,
    pendingAnalysis: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const data = await getDashboardStats();

        setStats(data.stats);
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      description: "Properties Added",
      icon: Building2,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "AI Reports",
      value: stats.aiReports,
      description: "Reports Generated",
      icon: FileText,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Average Score",
      value: `${stats.averageScore}%`,
      description: "Investment Score",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Pending Analysis",
      value: stats.pendingAnalysis,
      description: "Waiting for AI",
      icon: Clock,
      color: "bg-red-100 text-red-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-2xl bg-gray-200"
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
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {card.value}
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  {card.description}
                </p>
              </div>

              <div
                className={`rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${card.color}`}
              >
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}