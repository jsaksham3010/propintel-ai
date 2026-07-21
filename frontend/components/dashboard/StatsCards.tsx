"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  FileText,
  Star,
  Clock,
} from "lucide-react";

import { getDashboardStats } from "@/services/dashboardService";

export default function StatsCards() {

  const [stats, setStats] = useState({
    totalProperties: 0,
    aiReports: 0,
    averageScore: 0,
    pendingAnalysis: 0,
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();

        setStats(data.stats);

      } catch (error) {
        console.error(
          "Failed to fetch dashboard stats",
          error
        );
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
      description: "Properties added",
      icon: Building2,
    },
    {
      title: "AI Reports",
      value: stats.aiReports,
      description: "Reports generated",
      icon: FileText,
    },
    {
      title: "Average Score",
      value: `${stats.averageScore}%`,
      description: "AI property rating",
      icon: Star,
    },
    {
      title: "Pending Analysis",
      value: stats.pendingAnalysis,
      description: "Waiting for AI review",
      icon: Clock,
    },
  ];


  if (loading) {
    return (
      <div className="text-gray-500">
        Loading dashboard...
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
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-gray-900">
                  {card.value}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {card.description}
                </p>
              </div>


              <div className="rounded-xl bg-blue-50 p-3">
                <Icon
                  size={26}
                  className="text-blue-600"
                />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}