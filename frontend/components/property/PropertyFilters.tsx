"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

export default function PropertyFilters({
  onFilterChange,
}: FilterProps) {

  const [filters, setFilters] = useState({
    search: "",
    city: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });


  const handleChange = (
    key: string,
    value: string
  ) => {

    const updatedFilters = {
      ...filters,
      [key]: value,
    };

    setFilters(updatedFilters);

    onFilterChange(updatedFilters);
  };


  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">


        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            placeholder="Search property..."
            value={filters.search}
            onChange={(e)=>
              handleChange(
                "search",
                e.target.value
              )
            }
            className="w-full rounded-xl border px-10 py-3 outline-none focus:border-blue-500"
          />

        </div>



        {/* City */}

        <input
          placeholder="City"
          value={filters.city}
          onChange={(e)=>
            handleChange(
              "city",
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
        />



        {/* Property Type */}

        <select
          value={filters.propertyType}
          onChange={(e)=>
            handleChange(
              "propertyType",
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3 outline-none"
        >

          <option value="">
            All Types
          </option>

          <option value="Apartment">
            Apartment
          </option>

          <option value="Villa">
            Villa
          </option>

          <option value="Plot">
            Plot
          </option>

          <option value="Commercial">
            Commercial
          </option>

        </select>



        {/* Min Price */}

        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e)=>
            handleChange(
              "minPrice",
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3"
        />



        {/* Max Price */}

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e)=>
            handleChange(
              "maxPrice",
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3"
        />



        {/* Sort */}

        <select
          value={filters.sort}
          onChange={(e)=>
            handleChange(
              "sort",
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3"
        >

          <option value="">
            Latest
          </option>

          <option value="priceAsc">
            Price Low → High
          </option>

          <option value="priceDesc">
            Price High → Low
          </option>

        </select>


      </div>

    </div>
  );
}