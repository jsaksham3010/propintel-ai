import api from "./api";


export interface AIReport {

  overallScore?: number;

  condition?: string;

  wallCondition?: string;

  paintCondition?: string;

  floorCondition?: string;

  lighting?: string;

  cleanliness?: string;

  estimatedMaintenanceCost?: string;

  riskLevel?: string;

  recommendations?: string[];

  summary?: string;

}



export interface AnalyzeResponse {

  success: boolean;

  message: string;

  propertyId: string;

  propertyTitle: string;

  analyzedAt: string;

  report: AIReport;

}



export interface PropertyReport {

  _id: string;

  title: string;

  city: string;

  state: string;

  propertyType: string;

  price: number;

  area: number;

  analyzedAt: string;

  createdAt: string;


  images?: {

    url: string;

    public_id?: string;

  }[];


  aiReport: AIReport;

}



export interface GetAllReportsResponse {

  success: boolean;

  count: number;

  reports: PropertyReport[];

}





// Analyze Property

export const analyzeProperty = async (

  propertyId: string

): Promise<AnalyzeResponse> => {


  const { data } = await api.post(

    `/ai/analyze/${propertyId}`

  );


  return data;

};







// Get Single AI Report

export const getAIReport = async (

  propertyId: string

): Promise<AnalyzeResponse> => {


  const { data } = await api.get(

    `/ai/report/${propertyId}`

  );


  return data;

};







// Get All AI Reports

export const getAllAIReports = async (

): Promise<GetAllReportsResponse> => {


  const { data } = await api.get(

    "/ai/reports"

  );


  return data;

};






const aiService = {

  analyzeProperty,

  getAIReport,

  getAllAIReports,

};



export default aiService;