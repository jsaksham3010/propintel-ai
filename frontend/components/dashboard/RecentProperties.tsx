"use client";

import { useEffect, useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getProperties } from "@/services/propertyService";

export default function RecentProperties() {

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();

        setProperties(data.properties || []);

      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();

  }, []);


  if (loading) {
    return (
      <div className="mt-10 text-gray-500">
        Loading properties...
      </div>
    );
  }


  return (
    <div className="mt-10">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Properties
          </h2>

          <p className="text-gray-500 mt-1">
            Latest properties from your account
          </p>
        </div>


        <Link
          href="/properties"
          className="text-blue-600 font-medium flex items-center gap-2"
        >
          View All
          <ArrowRight size={18}/>
        </Link>

      </div>


      {properties.length === 0 ? (
        <div className="rounded-2xl bg-white border p-6 text-gray-500">
          No properties found.
        </div>
      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {properties.map((property)=>(
            <div
              key={property._id}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
            >

              <h3 className="text-xl font-semibold text-gray-900">
                {property.title}
              </h3>


              <div className="flex items-center gap-2 mt-2 text-gray-500">
                <MapPin size={16}/>
                {property.city}, {property.state}
              </div>


              <p className="mt-5 text-2xl font-bold">
                ₹{property.price.toLocaleString()}
              </p>


              <p className="mt-2 text-sm text-gray-500">
                {property.propertyType}
              </p>


              <Link
                href={`/properties/${property._id}`}
                className="mt-5 inline-flex items-center gap-2 text-blue-600 font-medium"
              >
                View Details
                <ArrowRight size={16}/>
              </Link>

            </div>
          ))}

        </div>

      )}

    </div>
  );
}