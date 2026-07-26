"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { analyzeProperty } from "@/services/propertyDetailService";

interface AIAnalysisProps {
  propertyId: string;
  onAnalysisComplete: () => void;
}

export default function AIAnalysis({
  propertyId,
  onAnalysisComplete,
}: AIAnalysisProps) {
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      await analyzeProperty(propertyId);

      alert("🎉 AI Analysis Completed Successfully!");

      onAnalysisComplete();
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "AI Analysis Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8">
      <h2 className="text-2xl font-bold">
        AI Property Inspection
      </h2>

      <p className="text-gray-500 mt-2 mb-6">
        Analyze your uploaded property images using Gemini AI.
      </p>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
      >
        <Sparkles size={20} />

        {loading
          ? "Analyzing..."
          : "Analyze with AI"}
      </button>
    </div>
  );
}