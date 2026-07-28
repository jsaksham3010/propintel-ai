"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PropertyInfo from "@/components/property/PropertyInfo";
import ImageGallery from "@/components/property/ImageGallery";
import UploadImages from "@/components/property/UploadImages";
import AIAnalysis from "@/components/property/AIAnalysis";
import AIReport from "@/components/property/AIReport";

import {
  getPropertyById,
  getAIReport,
} from "@/services/propertyDetailService";

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [property, setProperty] = useState<any>(null);
  const [aiReport, setAiReport] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProperty = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [propertyResult, reportResult] = await Promise.allSettled([
        getPropertyById(id),
        getAIReport(id),
      ]);

      if (
        propertyResult.status === "fulfilled" &&
        propertyResult.value?.property
      ) {
        setProperty(propertyResult.value.property);
      } else {
        setError("Property not found.");
      }

      if (reportResult.status === "fulfilled") {
        setAiReport(reportResult.value.report);
      } else {
        setAiReport(null);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchProperty();
  }, [id, fetchProperty]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-500">
          Loading Property...
        </h2>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold text-red-500">
          {error || "Property not found."}
        </h2>

        <button
          onClick={fetchProperty}
          className="rounded-xl bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <PropertyInfo property={property} />
        </div>

        <ImageGallery images={property.images || []} />

        <UploadImages
          propertyId={id}
          onUploadSuccess={fetchProperty}
        />

        <AIAnalysis
          propertyId={id}
          onAnalysisComplete={fetchProperty}
        />

        <AIReport report={aiReport} />
      </div>
    </div>
  );
}