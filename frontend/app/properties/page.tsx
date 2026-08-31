"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PropertyFilters from "@/components/property/PropertyFilters";

import {
  getProperties,
} from "@/services/propertyService";


import {
  Loader2,
  Sparkles,
  Pencil,
  MapPin,
} from "lucide-react";





interface Property {

  _id:string;

  title:string;

  city:string;

  state:string;

  price:number;

  propertyType:string;

  area:number;

  images?:{
    url:string;
  }[];

  aiReport?:{

    overallScore?:number;

    riskLevel?:string;

  };

}




type Filters = Record<string,string>;







export default function PropertiesPage(){



const [properties,setProperties] =
useState<Property[]>([]);


const [loading,setLoading] =
useState(true);


const [error,setError] =
useState("");



const [filters,setFilters] =
useState<Filters>({});







const fetchProperties = async(

currentFilters:Filters={}

)=>{


try{


setLoading(true);

setError("");



const data =
await getProperties(
currentFilters
);



setProperties(
data.properties || []
);



}

catch(err){


console.error(err);


setError(
"Failed to load properties."
);



}

finally{


setLoading(false);


}


};







useEffect(()=>{


fetchProperties();


},[]);










return(


<AuthGuard>

<DashboardLayout>



<div className="p-8">





<div className="mb-8 flex items-center justify-between">


<div>

<h1 className="text-3xl font-bold">

My Properties

</h1>


<p className="mt-2 text-gray-500">

Manage your real estate portfolio

</p>


</div>





<Link

href="/properties/add"

className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"

>

+ Add Property

</Link>


</div>







<PropertyFilters

onFilterChange={(newFilters)=>{


setFilters(newFilters);


fetchProperties(newFilters);


}}

/>









{
loading &&

<div className="flex h-80 items-center justify-center">

<Loader2

size={40}

className="animate-spin text-blue-600"

/>

</div>

}








{
error &&

<div className="mt-6 rounded-xl bg-red-50 p-4 text-red-600">

{error}

</div>

}









{
!loading &&
!error &&
properties.length===0 &&

<div className="mt-8 rounded-2xl border bg-white p-16 text-center">

<h2 className="text-2xl font-bold">

No Properties Found

</h2>


</div>

}








{
!loading &&
!error &&
properties.length>0 &&



<div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">


{

properties.map((property)=>(


<div

key={property._id}

className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"

>





<div className="relative">


<img

src={

property.images?.[0]?.url ||

"/placeholder-property.jpg"

}

alt={property.title}

className="h-56 w-full object-cover"

/>






{
property.aiReport &&


<div className="absolute left-4 top-4 flex gap-2">


<span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-semibold text-blue-600 shadow">


<Sparkles size={14}/>

{property.aiReport.overallScore || 0}/100


</span>





<span className={`rounded-full bg-white px-3 py-1 text-sm font-semibold shadow ${
property.aiReport.riskLevel?.toLowerCase()==="low"

?

"text-green-600"

:

"text-red-600"

}`}>

{property.aiReport.riskLevel}

</span>



</div>

}



</div>








<div className="p-6">



<h2 className="text-xl font-bold">

{property.title}

</h2>





<div className="mt-2 flex items-center gap-2 text-gray-500">


<MapPin size={16}/>


{property.city}, {property.state}


</div>







<p className="mt-4 text-2xl font-bold text-blue-600">

₹ {property.price.toLocaleString("en-IN")}

</p>








<div className="mt-4 flex gap-2">


<span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">

{property.propertyType}

</span>



<span className="rounded-full bg-gray-100 px-3 py-1 text-sm">

{property.area} sq.ft

</span>


</div>







<div className="mt-6 flex items-center justify-between">


<Link

href={`/properties/${property._id}`}

className="font-semibold text-blue-600"

>

View Details →

</Link>




<Link

href={`/properties/edit/${property._id}`}

className="flex items-center gap-1 text-gray-600 hover:text-blue-600"

>

<Pencil size={16}/>

Edit

</Link>



</div>






</div>



</div>


))


}


</div>


}






</div>



</DashboardLayout>

</AuthGuard>


);


}