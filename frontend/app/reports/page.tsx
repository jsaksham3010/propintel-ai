"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  getAllAIReports,
  PropertyReport,
} from "@/services/aiservice";


import {
  Sparkles,
  ShieldCheck,
  Building2,
  TrendingUp,
  Search,
  Download,
  ArrowRight,
  Filter,
  CheckSquare,
} from "lucide-react";


import { generateReportPDF } from "@/utils/generateReportPDF";





export default function ReportsPage(){


const [reports,setReports] =
useState<PropertyReport[]>([]);


const [loading,setLoading] =
useState(true);



const [search,setSearch] =
useState("");



const [risk,setRisk] =
useState("");



const [score,setScore] =
useState("");



const [selectedReports,setSelectedReports] =
useState<PropertyReport[]>([]);









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
"Reports Error:",
err
);

}
finally{

setLoading(false);

}


};


loadReports();


},[]);









const filteredReports =
useMemo(()=>{


return reports.filter((report)=>{


const text =
`${report.title} ${report.city} ${report.state}`
.toLowerCase();



const searchMatch =
text.includes(
search.toLowerCase()
);





const riskMatch =

!risk ||

report.aiReport?.riskLevel
?.toLowerCase()===risk;





const scoreValue =
report.aiReport?.overallScore || 0;



let scoreMatch=true;



if(score==="80"){

scoreMatch =
scoreValue >= 80;

}


if(score==="60"){

scoreMatch =
scoreValue >=60 &&
scoreValue <80;

}



if(score==="low"){

scoreMatch =
scoreValue <60;

}





return (
searchMatch &&
riskMatch &&
scoreMatch
);


});


},[
reports,
search,
risk,
score
]);









const averageScore =
reports.length

?

Math.round(

reports.reduce(

(sum,item)=>

sum + (item.aiReport?.overallScore || 0),

0

)

/

reports.length

)

:

0;









const toggleSelect = (
report:PropertyReport
)=>{


const exists =
selectedReports.some(
(item)=>item._id===report._id
);



if(exists){


setSelectedReports(

selectedReports.filter(

(item)=>

item._id!==report._id

)

);


}

else{


setSelectedReports([

...selectedReports,

report

]);


}



};








const selectAll = ()=>{


setSelectedReports(
filteredReports
);


};






const clearSelection = ()=>{


setSelectedReports([]);


};







const downloadSelectedPDF = ()=>{


selectedReports.forEach((report)=>{


generateReportPDF(

report.aiReport,

report

);


});


};









return(

<AuthGuard>

<DashboardLayout>


<div className="space-y-8">





<div>

<h1 className="text-4xl font-bold">

AI Inspection Reports

</h1>


<p className="mt-2 text-gray-500">

Gemini AI powered property intelligence reports.

</p>


</div>








<div className="grid gap-5 md:grid-cols-3">



<div className="rounded-2xl border bg-white p-6">

<div className="flex items-center gap-3">

<Building2 className="text-blue-600"/>

<h3 className="font-semibold">

Total Reports

</h3>

</div>


<p className="mt-4 text-4xl font-bold">

{reports.length}

</p>


</div>







<div className="rounded-2xl border bg-white p-6">


<div className="flex items-center gap-3">

<TrendingUp className="text-green-600"/>

<h3 className="font-semibold">

Average Score

</h3>

</div>


<p className="mt-4 text-4xl font-bold text-green-600">

{averageScore}

</p>


</div>








<div className="rounded-2xl border bg-white p-6">

<div className="flex items-center gap-3">

<ShieldCheck className="text-indigo-600"/>

<h3 className="font-semibold">

Selected Reports

</h3>

</div>


<p className="mt-4 text-4xl font-bold">

{selectedReports.length}

</p>


</div>



</div>









<div className="rounded-3xl border bg-white p-6 shadow-sm">


<div className="mb-5 flex items-center gap-2 font-bold">

<Filter size={20}/>

Filters

</div>





<div className="grid gap-4 md:grid-cols-3">



<div className="relative">


<Search

size={18}

className="absolute left-3 top-3 text-gray-400"

/>



<input

placeholder="Search property..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full rounded-xl border py-3 pl-10 pr-4"

/>


</div>







<select

value={risk}

onChange={(e)=>setRisk(e.target.value)}

className="rounded-xl border px-4 py-3"

>

<option value="">

All Risk

</option>

<option value="low">

Low

</option>


<option value="medium">

Medium

</option>


<option value="high">

High

</option>


</select>








<select

value={score}

onChange={(e)=>setScore(e.target.value)}

className="rounded-xl border px-4 py-3"

>


<option value="">

All Scores

</option>


<option value="80">

80+ Score

</option>


<option value="60">

60-80 Score

</option>


<option value="low">

Below 60

</option>


</select>




</div>


</div>









<div className="flex flex-wrap items-center justify-between rounded-3xl border bg-white p-5">


<div className="flex gap-3">


<button

onClick={selectAll}

className="rounded-xl bg-blue-600 px-4 py-2 text-white"

>

Select All

</button>



<button

onClick={clearSelection}

className="rounded-xl border px-4 py-2"

>

Clear

</button>


</div>






<button

disabled={selectedReports.length===0}

onClick={downloadSelectedPDF}

className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white disabled:opacity-50"

>


<Download size={18}/>

Download Selected PDF


</button>



</div>









{
loading ?

<p>

Loading Reports...

</p>


:

filteredReports.length===0 ?


<div className="rounded-2xl border bg-white p-10 text-center">

<Sparkles className="mx-auto text-blue-600"/>

<h2 className="mt-3 text-xl font-bold">

No Reports Found

</h2>

</div>



:

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">


{

filteredReports.map((report)=>(



<div

key={report._id}

className="overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-xl transition"

>





<div className="h-44 bg-gray-100">


{

report.images?.[0]?.url ?

<img

src={report.images[0].url}

className="h-full w-full object-cover"

/>


:

<div className="flex h-full items-center justify-center text-gray-400">

No Image

</div>


}


</div>







<div className="p-6">


<div className="flex justify-between">


<h2 className="text-xl font-bold">

{report.title}

</h2>



<input

type="checkbox"

checked={
selectedReports.some(
(item)=>item._id===report._id
)
}

onChange={()=>toggleSelect(report)}

className="h-5 w-5"

/>


</div>




<p className="mt-2 text-gray-500">

📍 {report.city}, {report.state}

</p>






<div className="mt-5 flex justify-between">


<div>

<p className="text-sm text-gray-500">

AI Score

</p>


<p className="text-4xl font-bold text-blue-600">

{report.aiReport?.overallScore || 0}

</p>


</div>




<span className="rounded-full bg-blue-50 px-4 py-2 text-blue-600 font-semibold">

{report.aiReport?.riskLevel || "-"}

</span>



</div>







<div className="mt-6 flex gap-3">


<Link

href={`/properties/${report._id}`}

className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"

>

View

<ArrowRight size={16}/>

</Link>






<button

onClick={()=>generateReportPDF(report.aiReport,report)}

className="flex items-center gap-2 rounded-xl border px-4 py-2 text-green-600"

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


}




</div>


</DashboardLayout>


</AuthGuard>

);


}