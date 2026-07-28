"use client";

import { useEffect, useState } from "react";
import { MapPin, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getProperties } from "@/services/propertyService";

interface Property {
  _id: string;
  title: string;
  city: string;
  state: string;
  propertyType: string;
  price: number;
  images?: string[];
}

export default function RecentProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        const data = await getProperties();

        setProperties((data.properties || []).slice(0, 6));
      } catch (err) {
        console.error(err);
        setError("Unable to load recent properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-72 animate-pulse rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
        <AlertCircle size={18} />
        {error}
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Properties
          </h2>

          <p className="mt-1 text-gray-500">
            Latest properties from your portfolio
          </p>
        </div>

        <Link
          href="/properties"
          className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
          No properties found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property._id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-44 bg-gray-100">
                {property.images?.length ? (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {property.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-gray-500">
                  <MapPin size={16} />
                  <span>
                    {property.city}, {property.state}
                  </span>
                </div>

                <p className="mt-4 text-2xl font-bold text-gray-900">
                  ₹{Number(property.price ?? 0).toLocaleString("en-IN")}
                </p>

                <span className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                  {property.propertyType}
                </span>

                <Link
                  href={`/properties/${property._id}`}
                  className="mt-5 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
                >
                  View Details
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}