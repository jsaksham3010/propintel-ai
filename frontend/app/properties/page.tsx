"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PropertyFilters from "@/components/property/PropertyFilters";
import { getProperties } from "@/services/propertyService";
import { Loader2 } from "lucide-react";


interface Property {
  _id: string;
  title: string;
  city: string;
  state: string;
  price: number;
  propertyType: string;
  area: number;
  images?: {
    url: string;
  }[];
}


export default function PropertiesPage() {


  const [properties, setProperties] = useState<Property[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [filters, setFilters] = useState({});



  const fetchProperties = async (
    currentFilters = filters
  ) => {

    try {

      setLoading(true);

      setError("");

      const data = await getProperties(
        currentFilters
      );


      setProperties(
        data.properties || []
      );


    } catch (err) {

      console.error(err);

      setError(
        "Failed to load properties."
      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchProperties();

  }, []);




  return (

    <AuthGuard>

      <DashboardLayout>


        <div className="p-8">


          {/* Header */}

          <div className="flex items-center justify-between mb-8">


            <div>

              <h1 className="text-3xl font-bold text-gray-900">
                My Properties
              </h1>


              <p className="text-gray-500 mt-2">
                Manage and analyze your listed properties.
              </p>


            </div>



            <Link
              href="/dashboard/properties/add"
              className="rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >

              + Add Property

            </Link>


          </div>





          {/* Filters */}

          <PropertyFilters

            onFilterChange={(newFilters)=>{

              setFilters(newFilters);

              fetchProperties(newFilters);

            }}

          />





          {/* Loading */}

          {loading && (

            <div className="flex justify-center items-center h-80">

              <Loader2
                size={40}
                className="animate-spin text-blue-600"
              />

            </div>

          )}






          {/* Error */}

          {!loading && error && (

            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-600">

              {error}

            </div>

          )}






          {/* Empty */}

          {!loading &&
          !error &&
          properties.length === 0 && (

            <div className="mt-8 bg-white rounded-2xl shadow-sm border p-16 text-center">


              <h2 className="text-2xl font-semibold">

                No Properties Found

              </h2>


              <p className="text-gray-500 mt-3">

                Try changing filters or add a new property.

              </p>



            </div>

          )}






          {/* Cards */}

          {!loading &&
          !error &&
          properties.length > 0 && (

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">


              {properties.map((property)=>(


                <div

                  key={property._id}

                  className="overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl transition"

                >



                  <img

                    src={
                      property.images?.[0]?.url ||
                      "/placeholder-property.jpg"
                    }

                    alt={property.title}

                    className="h-52 w-full object-cover"

                  />





                  <div className="p-5">


                    <h2 className="text-xl font-bold text-gray-900">

                      {property.title}

                    </h2>




                    <p className="mt-2 text-gray-500">

                      📍 {property.city}, {property.state}

                    </p>




                    <p className="mt-4 text-2xl font-bold text-blue-600">

                      ₹ {property.price.toLocaleString("en-IN")}

                    </p>





                    <div className="flex gap-3 mt-3">


                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">

                        {property.propertyType}

                      </span>



                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">

                        {property.area} sq.ft

                      </span>


                    </div>





                    <Link

                      href={`/dashboard/properties/${property._id}`}

                      className="mt-5 inline-block text-blue-600 font-semibold hover:underline"

                    >

                      View Details →

                    </Link>



                  </div>


                </div>


              ))}


            </div>

          )}



        </div>


      </DashboardLayout>

    </AuthGuard>

  );

}