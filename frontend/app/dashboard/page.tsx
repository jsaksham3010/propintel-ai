"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";

import StatsCards from "@/components/dashboard/StatsCards";
import RecentProperties from "@/components/dashboard/RecentProperties";
import AIReports from "@/components/dashboard/AIReports";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <section className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome back 👋
            </h1>

            <p className="text-gray-500">
              Monitor your properties, AI investment reports and portfolio
              performance from one place.
            </p>
          </section>

          {/* Stats */}
          <section>
            <StatsCards />
          </section>

          {/* Main Dashboard */}
          <section className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <RecentProperties />
            <AIReports />
          </section>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}