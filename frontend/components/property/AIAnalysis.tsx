"use client";

import { useState } from "react";
import { Sparkles, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { analyzeProperty } from "@/services/aiservice";

interface AIAnalysisProps {
  propertyId: string;
  onAnalysisComplete: () => void;
}

export default function AIAnalysis({
  propertyId,
  onAnalysisComplete,
}: AIAnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const response = await analyzeProperty(propertyId);

      setSuccess(
        response.message || "AI analysis completed successfully."
      );

      onAnalysisComplete();
    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to analyze this property."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Sparkles className="text-indigo-600" size={26} />
        AI Property Inspection
      </h2>

      <p className="mt-2 text-gray-500">
        Analyze your uploaded property images using Gemini AI and receive an
        investment report with insights, risk analysis, and recommendations.
      </p>

      {success && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          <CheckCircle size={20} />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Analyzing Property...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Analyze with AI
          </>
        )}
      </button>
    </div>
  );
}