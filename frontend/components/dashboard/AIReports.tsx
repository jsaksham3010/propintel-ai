"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Sparkles,
  ShieldCheck,
  MapPin,
  ArrowRight,
  AlertCircle,
  Download,
  TrendingUp,
} from "lucide-react";


import {
  getAllAIReports,
  PropertyReport,
} from "@/services/aiservice";


import {
  generateReportPDF,
} from "@/utils/generateReportPDF";





export default function AIReports(){



const [reports,setReports] =
useState<PropertyReport[]>([]);



const [loading,setLoading] =
useState(true);



const [error,setError] =
useState("");







useEffect(()=>{


const loadReports = async()=>{


try{


const data =
await getAllAIReports();



setReports(

data.reports || []

);



}

catch(err){


console.error(

"AI Reports Error:",

err

);



setError(

"Unable to load AI reports."

);


}

finally{


setLoading(false);


}


};



loadReports();



},[]);








const downloadPDF = (

report:PropertyReport

)=>{


generateReportPDF(

report.aiReport,

report

);


};








if(loading){


return (

<div className="grid gap-6 md:grid-cols-2">


{[1,2].map(item=>(


<div

key={item}

className="h-80 rounded-3xl bg-gray-200 animate-pulse"

/>


))}


</div>

);


}








if(error){


return (

<div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">


<AlertCircle size={18}/>

{error}


</div>

);


}









return (

<section className="mt-10">





<div className="mb-6 flex items-center justify-between">


<div>


<div className="flex items-center gap-2">


<Sparkles className="text-blue-600"/>


<h2 className="text-2xl font-bold">

AI Inspection Reports

</h2>


</div>



<p className="mt-1 text-gray-500">

Gemini AI generated property intelligence

</p>



</div>





<Link

href="/reports"

className="flex items-center gap-2 font-medium text-blue-600"

>

View All

<ArrowRight size={18}/>

</Link>



</div>









{

reports.length===0 ?


(

<div className="rounded-2xl border bg-white p-8 text-center text-gray-500">

No AI reports available.

</div>

)


:


(

<div className="grid gap-6 md:grid-cols-2">





{

reports.map((report)=>(



<div

key={report._id}

className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"

>







<div className="h-44 bg-gray-100">


{

report.images?.[0]?.url ?


<img

src={report.images[0].url}

alt={report.title}

className="h-full w-full object-cover"

/>


:


<div className="flex h-full items-center justify-center text-gray-400">

No Image

</div>


}


</div>









<div className="p-6">





<h3 className="text-xl font-bold">

{report.title}

</h3>






<div className="mt-2 flex items-center gap-2 text-gray-500">


<MapPin size={16}/>


{report.city}, {report.state}


</div>









<div className="mt-5 flex items-center justify-between">



<div>


<p className="text-sm text-gray-500">

AI Score

</p>


<p className="text-4xl font-bold text-blue-600">

{report.aiReport?.overallScore || 0}

</p>


</div>







<div className="rounded-2xl bg-blue-50 p-3">

<Sparkles className="text-blue-600"/>

</div>




</div>









<div className="mt-6 flex items-center justify-between">



<span className="flex items-center gap-2 text-gray-500">


<ShieldCheck size={17}/>


Risk


</span>





<span

className={`rounded-full px-4 py-1 text-sm font-semibold ${
(
report.aiReport?.riskAnalysis?.riskLevel ||
""
)
.toLowerCase()
.includes("low")

?

"bg-green-100 text-green-700"


:

(
report.aiReport?.riskAnalysis?.riskLevel ||
""
)
.toLowerCase()
.includes("medium")


?

"bg-yellow-100 text-yellow-700"


:

"bg-red-100 text-red-700"

}`}

>


{

report.aiReport?.riskAnalysis?.riskLevel ||

"Not Available"

}


</span>



</div>









<div className="mt-4 flex items-center gap-2 text-sm text-gray-500">


<TrendingUp size={15}/>


{

report.aiReport?.investmentAnalysis?.investmentRating ||

"Not Available"

}



</div>








<div className="mt-4 text-sm text-gray-500">


Analyzed:

{" "}

{

new Date(

report.analyzedAt

).toLocaleDateString("en-IN")

}



</div>








<div className="mt-6 flex gap-4">



<Link

href={`/properties/${report._id}`}

className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"

>


View Report


<ArrowRight size={16}/>


</Link>







<button

onClick={()=>downloadPDF(report)}

className="flex items-center gap-2 rounded-xl border px-4 py-2 text-green-600 font-medium hover:bg-green-50"

>


<Download size={16}/>


PDF


</button>





</div>






</div>



</div>



))


}




</div>


)


}



</section>


);



}