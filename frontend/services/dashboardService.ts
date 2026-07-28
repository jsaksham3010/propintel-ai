import api from "./api";

export interface DashboardStats {
  totalProperties: number;
  aiReports: number;
  averageScore: number;
  pendingAnalysis: number;
}

export interface RiskDistribution {
  low: number;
  medium: number;
  high: number;
}

export interface RecentReport {
  id: string;
  title: string;
  city: string;
  overallScore: number;
  riskLevel: string;
  investmentRating: string;
  analyzedAt: string;
}

export interface DashboardResponse {
  success: boolean;
  stats: DashboardStats;
  riskDistribution: RiskDistribution;
  investmentDistribution: Record<string, number>;
  propertyTypes: Record<string, number>;
  recentReports: RecentReport[];
}

export const getDashboardStats =
  async (): Promise<DashboardResponse> => {
    const { data } = await api.get("/dashboard/stats");
    return data;
  };

const dashboardService = {
  getDashboardStats,
};

export default dashboardService;