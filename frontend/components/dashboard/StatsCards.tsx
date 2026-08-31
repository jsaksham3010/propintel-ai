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
  const [error, setError] = useState("");



  useEffect(() => {

    const fetchStats = async () => {

      const token = localStorage.getItem("token");


      if (!token) {

        console.log(
          "Token not available yet"
        );

        return;

      }


      try {

        setLoading(true);


        const data = await getDashboardStats();


        setStats(
          data.stats
        );


      } catch (err) {

        console.error(
          "Dashboard Stats Error:",
          err
        );


        setError(
          "Unable to load dashboard."
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {[1,2,3,4].map((item)=>(

          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl bg-gray-100"
          />

        ))}

      </div>

    );

  }



  if (error) {

    return (

      <div className="rounded-xl bg-red-50 p-4 text-red-600">

        {error}

      </div>

    );

  }



  return (

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card)=>{

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
                className={`rounded-xl p-3 ${card.color}`}
              >

                <Icon size={26}/>

              </div>


            </div>

          </div>

        );

      })}

    </div>

  );

}