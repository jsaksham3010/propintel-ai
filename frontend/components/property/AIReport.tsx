"use client";

import {
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  Wrench,
  PaintBucket,
  Download,
  TrendingUp,
  AlertTriangle,
  Home,
} from "lucide-react";

import { generateReportPDF } from "@/utils/generateReportPDF";



interface AIReportProps {

  report?: any;

  property?: any;

}





export default function AIReport({

report,

property,

}:AIReportProps){



if(!report){


return (

<div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">


<div className="flex items-center gap-3">


<Sparkles className="text-indigo-600"/>


<h2 className="text-2xl font-bold">

AI Property Report

</h2>


</div>




<p className="mt-4 text-gray-500">

No AI report available.

</p>


</div>

);


}






const downloadPDF = ()=>{


generateReportPDF(

report,

property

);


};






const risk =

report.riskAnalysis?.riskLevel ||

report.riskLevel ||

"Not Available";






const investmentRating =

report.investmentAnalysis?.investmentRating ||

report.investmentRating ||

"Not Available";








return (

<div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">







{/* Header */}

<div className="mb-8 flex items-center justify-between">


<div className="flex items-center gap-3">


<Sparkles

className="text-indigo-600"

size={28}

/>



<h2 className="text-2xl font-bold">

AI Property Intelligence Report

</h2>


</div>






<button

onClick={downloadPDF}

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700"

>


<Download size={18}/>

Download PDF


</button>



</div>









{/* Builder Branding */}


{

property?.builderDetails?.companyName && (


<div className="mb-8 rounded-2xl border bg-gray-50 p-5">


<div className="flex items-center justify-between">


<div>


<p className="text-sm text-gray-500">

Presented By

</p>



<h3 className="mt-1 text-xl font-bold text-gray-900">

{property.builderDetails.companyName}

</h3>


</div>







{

property.builderDetails.companyLogo && (


<img

src={property.builderDetails.companyLogo}

alt="Builder Logo"

className="h-14 w-14 rounded-xl object-cover"

/>


)

}




</div>


</div>


)

}









{/* Property Information */}


{

property?.title && (


<div className="mb-8 rounded-2xl border p-5">


<h3 className="text-xl font-bold">

{property.title}

</h3>



<p className="mt-2 text-gray-500">

{property.city}, {property.state}

</p>



</div>


)

}









{/* Top Cards */}


<div className="grid gap-5 md:grid-cols-3">



<div className="rounded-2xl bg-green-50 p-6">


<p className="text-sm text-gray-500">

AI Score

</p>



<h2 className="mt-2 text-4xl font-bold text-green-600">

{report.overallScore || 0}/100

</h2>


</div>







<div className="rounded-2xl bg-red-50 p-6">


<ShieldAlert className="text-red-600"/>


<p className="mt-2 text-gray-500">

Risk Level

</p>


<h2 className="font-bold">

{risk}

</h2>


</div>







<div className="rounded-2xl bg-blue-50 p-6">


<TrendingUp className="text-blue-600"/>


<p className="mt-2 text-gray-500">

Investment Rating

</p>


<h2 className="font-bold">

{investmentRating}

</h2>


</div>



</div>









{/* Property Overview */}

<div className="mt-8 rounded-2xl border p-6">


<h3 className="flex items-center gap-2 text-xl font-bold">

<Home size={20}/>

Property Overview

</h3>





<div className="mt-5 grid gap-5 md:grid-cols-3">


<div>

<p className="text-gray-500">

Condition

</p>


<p className="font-semibold">

{report.propertyOverview?.condition || "Not Available"}

</p>


</div>





<div>

<p className="text-gray-500">

Estimated Age

</p>


<p className="font-semibold">

{report.propertyOverview?.estimatedAge || "Not Available"}

</p>


</div>





<div>

<p className="text-gray-500">

Quality

</p>


<p className="font-semibold">

{report.propertyOverview?.propertyQuality || "Not Available"}

</p>


</div>



</div>


</div>









{/* Structural + Interior */}

<div className="mt-8 grid gap-6 md:grid-cols-2">



<div className="rounded-2xl border p-6">


<h3 className="flex gap-2 font-bold">

<Wrench size={20}/>

Structural Analysis

</h3>



<p className="mt-4 text-gray-600">

Walls:

{" "}

{report.structuralAnalysis?.wallCondition || "Not Available"}

</p>




<p className="mt-2 text-gray-600">

Floor:

{" "}

{report.structuralAnalysis?.floorCondition || "Not Available"}

</p>




<p className="mt-2 text-gray-600">

Structural Risk:

{" "}

{report.structuralAnalysis?.structuralRisk || "Not Available"}

</p>


</div>








<div className="rounded-2xl border p-6">


<h3 className="flex gap-2 font-bold">

<PaintBucket size={20}/>

Interior Analysis

</h3>




<p className="mt-4 text-gray-600">

Paint:

{" "}

{report.interiorAnalysis?.paintCondition || "Not Available"}

</p>




<p className="mt-2 text-gray-600">

Lighting:

{" "}

{report.interiorAnalysis?.lighting || "Not Available"}

</p>




<p className="mt-2 text-gray-600">

Cleanliness:

{" "}

{report.interiorAnalysis?.cleanliness || "Not Available"}

</p>



</div>



</div>









{/* Maintenance */}

<div className="mt-8 rounded-2xl bg-yellow-50 p-6">


<h3 className="flex items-center gap-2 text-xl font-bold">

<AlertTriangle/>

Maintenance Analysis

</h3>



<p className="mt-4">

Estimated Cost:

{" "}

<b>

{report.maintenanceAnalysis?.estimatedMaintenanceCost || "Not Available"}

</b>

</p>



<ul className="mt-4 space-y-2">


{

(report.maintenanceAnalysis?.urgentRepairs || [])

.map(

(item:string,index:number)=>(

<li key={index}>

• {item}

</li>

)

)


}



</ul>


</div>









{/* Investment */}

<div className="mt-8 rounded-2xl bg-blue-50 p-6">


<h3 className="text-xl font-bold">

Investment Analysis

</h3>



<p className="mt-3">

Rental Potential:

{" "}

<b>

{report.investmentAnalysis?.rentalPotential || "Not Available"}

</b>


</p>




<p className="mt-2">

Resale Potential:

{" "}

<b>

{report.investmentAnalysis?.resalePotential || "Not Available"}

</b>


</p>


</div>









{/* Summary */}

<div className="mt-8 rounded-2xl bg-indigo-50 p-6">


<h3 className="text-xl font-bold">

AI Summary

</h3>


<p className="mt-3 text-gray-700">

{report.summary || "Not Available"}

</p>


</div>









{/* Recommendations */}

<div className="mt-8 rounded-2xl bg-green-50 p-6">


<h3 className="flex items-center gap-2 text-xl font-bold text-green-700">

<CheckCircle2/>

Recommendations

</h3>




<ul className="mt-4 space-y-2">


{

(report.recommendations || [])

.map(

(item:string,index:number)=>(


<li key={index}>

• {item}

</li>


)

)


}



</ul>


</div>







</div>

);


}