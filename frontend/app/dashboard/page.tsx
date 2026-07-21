import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentProperties from "@/components/dashboard/RecentProperties";
import AIReports from "@/components/dashboard/AIReports";

export default function DashboardPage() {
  return (
    <DashboardLayout>

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back 👋
        </h1>

        <p className="mt-3 text-gray-500">
          Manage your properties and AI inspection reports.
        </p>
      </div>

      <div className="mt-8">
        <StatsCards />
      </div>

      <div className="mt-8">
        <RecentProperties />
      </div>

      <div className="mt-8">
        <AIReports />
      </div>

    </DashboardLayout>
  );
}