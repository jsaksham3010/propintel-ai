"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  MapPin,
  IndianRupee,
  Home,
  Ruler,
} from "lucide-react";

import { getPropertyById } from "@/services/propertyDetailService";

export default function PropertyDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);

        setProperty(data.property);

      } catch (error) {
        console.error(
          "Failed to fetch property",
          error
        );
      } finally {
        setLoading(false);
      }
    };


    if (id) {
      fetchProperty();
    }

  }, [id]);


  if (loading) {
    return (
      <div className="p-10 text-gray-500">
        Loading property...
      </div>
    );
  }


  if (!property) {
    return (
      <div className="p-10 text-red-500">
        Property not found
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl border shadow-sm p-8">

          <h1 className="text-4xl font-bold text-gray-900">
            {property.title}
          </h1>


          <div className="mt-4 flex items-center gap-2 text-gray-500">
            <MapPin size={18}/>
            {property.city}, {property.state}
          </div>


          <div className="grid md:grid-cols-3 gap-5 mt-8">


            <div className="rounded-2xl bg-blue-50 p-5">
              <IndianRupee className="text-blue-600"/>
              <p className="mt-3 text-gray-500">
                Price
              </p>
              <h3 className="text-xl font-bold">
                ₹{property.price.toLocaleString()}
              </h3>
            </div>


            <div className="rounded-2xl bg-blue-50 p-5">
              <Ruler className="text-blue-600"/>
              <p className="mt-3 text-gray-500">
                Area
              </p>
              <h3 className="text-xl font-bold">
                {property.area} sq.ft
              </h3>
            </div>


            <div className="rounded-2xl bg-blue-50 p-5">
              <Home className="text-blue-600"/>
              <p className="mt-3 text-gray-500">
                Type
              </p>
              <h3 className="text-xl font-bold">
                {property.propertyType}
              </h3>
            </div>


          </div>


        </div>

      </div>

    </div>
  );
}