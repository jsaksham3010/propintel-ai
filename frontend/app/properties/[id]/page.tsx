"use client";

import { useEffect, useState } from "react";
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

  const fetchProperty = async () => {
    try {
      const propertyData = await getPropertyById(id);

      setProperty(propertyData.property);

      try {
        const reportData = await getAIReport(id);

        setAiReport(reportData.report);
      } catch {
        setAiReport(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-500">
          Loading Property...
        </h2>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-red-500">
          Property not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Property Information */}
        <div className="bg-white rounded-3xl border shadow-sm p-8">
          <PropertyInfo property={property} />
        </div>

        {/* Property Images */}
        <ImageGallery images={property.images || []} />

        {/* Upload Images */}
        <UploadImages
          propertyId={id}
          onUploadSuccess={fetchProperty}
        />

        {/* AI Analysis */}
        <AIAnalysis
          propertyId={id}
          onAnalysisComplete={fetchProperty}
        />

        {/* AI Report */}
        <AIReport report={aiReport} />

      </div>
    </div>
  );
}