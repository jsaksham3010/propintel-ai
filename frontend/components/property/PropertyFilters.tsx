"use client";

import { useState } from "react";

import {
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";



interface FilterProps {

  onFilterChange:(filters:any)=>void;

}




export default function PropertyFilters({

  onFilterChange,

}:FilterProps){



const initialFilters = {

search:"",
city:"",
propertyType:"",
minPrice:"",
maxPrice:"",
sort:"",

};



const [filters,setFilters] =
useState(initialFilters);






const handleChange = (

key:string,

value:string

)=>{


const updated = {

...filters,

[key]:value,

};



setFilters(updated);


onFilterChange(updated);


};







const clearFilters = ()=>{


setFilters(initialFilters);


onFilterChange(initialFilters);


};







return (

<div className="rounded-3xl border bg-white p-6 shadow-sm">



<div className="mb-6 flex items-center justify-between">


<div className="flex items-center gap-3">


<div className="rounded-xl bg-blue-100 p-3">

<SlidersHorizontal

className="text-blue-600"

/>

</div>


<div>


<h2 className="text-xl font-bold">

Search & Filters

</h2>


<p className="text-sm text-gray-500">

Find your ideal property

</p>


</div>


</div>





<button

onClick={clearFilters}

className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600"

>


<X size={16}/>

Clear


</button>



</div>









<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">





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








<div className="mt-5">


<p className="mb-3 text-sm font-medium text-gray-500">

Property Type

</p>



<div className="flex flex-wrap gap-3">


{
[
"",
"Apartment",
"Villa",
"Plot",
"Commercial"

].map((type)=>(


<button

key={type || "all"}

onClick={()=>handleChange(
"propertyType",
type
)}

className={`rounded-full px-5 py-2 text-sm font-medium transition ${
filters.propertyType===type

?

"bg-blue-600 text-white"

:

"bg-gray-100 text-gray-600 hover:bg-blue-50"

}`}


>


{
type || "All"

}


</button>


))

}


</div>


</div>









<div className="mt-5 grid gap-4 md:grid-cols-2">



<input

type="number"

placeholder="Minimum Price"

value={filters.minPrice}

onChange={(e)=>

handleChange(
"minPrice",
e.target.value
)

}

className="rounded-xl border px-4 py-3"

/>





<input

type="number"

placeholder="Maximum Price"

value={filters.maxPrice}

onChange={(e)=>

handleChange(
"maxPrice",
e.target.value
)

}

className="rounded-xl border px-4 py-3"

/>




</div>







</div>

);

}