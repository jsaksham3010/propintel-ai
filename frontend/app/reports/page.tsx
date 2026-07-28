"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AIReports from "@/components/dashboard/AIReports";

export default function ReportsPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              AI Inspection Reports
            </h1>

            <p className="mt-2 text-gray-500">
              View all AI generated property inspection reports powered by
              Gemini AI.
            </p>
          </div>

          <AIReports />
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}