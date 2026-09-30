"use client";

import Link from "next/link";

import {
  MapPin,
  IndianRupee,
  Home,
  Ruler,
  Pencil,
  Building2,
} from "lucide-react";


interface PropertyInfoProps {

  property:any;

}






export default function PropertyInfo({

property,

}:PropertyInfoProps){





const builderName =

property.owner?.companyName ||

property.owner?.fullName ||

"Individual Owner";







return (

<div>





<div className="flex items-start justify-between gap-4">





<div className="flex flex-col gap-4">





<h1 className="text-4xl font-bold text-gray-900">

{property.title}

</h1>







<div className="flex flex-wrap gap-3">





<div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-600">


<MapPin size={18}/>


{property.city}, {property.state}


</div>








<div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-purple-600">


<Building2 size={18}/>


{builderName}


</div>






</div>






</div>








{

property._id &&


<Link

href={`/properties/edit/${property._id}`}

className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"

>


<Pencil size={18}/>


Edit Property


</Link>


}





</div>









<div className="mt-8 grid gap-6 md:grid-cols-3">







<div className="rounded-3xl bg-blue-50 p-6">



<div className="flex items-center gap-3">



<div className="rounded-xl bg-blue-600 p-3">


<IndianRupee

size={22}

className="text-white"

/>


</div>




<p className="text-gray-500">

Price

</p>




</div>







<h2 className="mt-5 text-3xl font-bold text-gray-900">


₹{Number(property.price || 0).toLocaleString("en-IN")}


</h2>




</div>









<div className="rounded-3xl bg-indigo-50 p-6">



<div className="flex items-center gap-3">



<div className="rounded-xl bg-indigo-600 p-3">


<Ruler

size={22}

className="text-white"

/>


</div>




<p className="text-gray-500">

Area

</p>




</div>







<h2 className="mt-5 text-3xl font-bold text-gray-900">

{property.area} sq.ft

</h2>





</div>









<div className="rounded-3xl bg-green-50 p-6">



<div className="flex items-center gap-3">



<div className="rounded-xl bg-green-600 p-3">


<Home

size={22}

className="text-white"

/>


</div>




<p className="text-gray-500">

Property Type

</p>




</div>







<h2 className="mt-5 text-3xl font-bold text-gray-900">

{property.propertyType}

</h2>




</div>









</div>






</div>

);


}