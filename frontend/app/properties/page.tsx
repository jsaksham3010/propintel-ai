"use client";


import { useEffect,useState } from "react";
import Link from "next/link";
import { getProperties } from "@/services/propertyService";


export default function PropertiesPage(){


const [properties,setProperties]=useState<any[]>([]);



useEffect(()=>{


const fetchData=async()=>{

const data=await getProperties();

setProperties(
data.properties
);

};


fetchData();


},[]);




return (

<div className="p-8">


<div className="flex justify-between mb-8">


<h1 className="text-3xl font-bold">
My Properties
</h1>


<Link
href="/properties/add"
className="bg-blue-600 text-white px-5 py-3 rounded-xl"
>
Add Property
</Link>


</div>




<div className="grid md:grid-cols-3 gap-6">


{
properties.map((property)=>(
<div
key={property._id}
className="bg-white border rounded-2xl p-5"
>


<h2 className="font-bold text-xl">
{property.title}
</h2>


<p>
{property.city}, {property.state}
</p>


<p className="mt-2">
₹ {property.price}
</p>


<Link
href={`/properties/${property._id}`}
className="text-blue-600 mt-3 block"
>
View Details
</Link>


</div>
))
}


</div>


</div>

);


}