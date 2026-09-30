"use client";

import { useEffect, useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  Building2,
  FileText,
  Plus,
  TrendingUp,
  Star,
  Clock,
} from "lucide-react";

import Link from "next/link";

import {
  getDashboardStats,
  DashboardResponse,
} from "@/services/dashboardService";



export default function BuilderDashboard(){


const [dashboard,setDashboard] =
useState<DashboardResponse | null>(null);


const [loading,setLoading] =
useState(true);


const [error,setError] =
useState("");





useEffect(()=>{


const fetchDashboard = async()=>{


try{


const data = await getDashboardStats();


setDashboard(data);


}

catch(err:any){


console.error(
"Builder Dashboard Error:",
err
);


setError(
"Unable to load dashboard data"
);


}

finally{


setLoading(false);


}


};



fetchDashboard();


},[]);









const stats=[

{

title:"My Properties",

value:
dashboard?.stats.totalProperties ?? 0,

icon:Building2,

},


{

title:"AI Reports",

value:
dashboard?.stats.aiReports ?? 0,

icon:FileText,

},


{

title:"Average AI Score",

value:
`${dashboard?.stats.averageScore ?? 0}%`,

icon:Star,

},


{

title:"Pending Analysis",

value:
dashboard?.stats.pendingAnalysis ?? 0,

icon:Clock,

},


];







return (

<AuthGuard allowedRoles={["builder"]}>


<DashboardLayout>


<div className="space-y-8">





<div className="flex flex-col md:flex-row justify-between gap-5">


<div>


<h1 className="text-3xl font-bold">

Builder Dashboard

</h1>


<p className="text-gray-500 mt-2">

Manage your real estate listings with AI intelligence.

</p>


</div>





<Link

href="/properties/add"

className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 w-fit"

>


<Plus size={18}/>

Add Property


</Link>



</div>








{
loading && (

<div className="rounded-xl bg-white border p-5">

Loading builder analytics...

</div>

)

}







{
error && (

<div className="rounded-xl bg-red-50 text-red-600 p-4">

{error}

</div>

)

}









<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">


{

stats.map((item)=>{


const Icon=item.icon;


return (

<div

key={item.title}

className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg transition"

>


<div className="flex justify-between">


<div>


<p className="text-gray-500 text-sm">

{item.title}

</p>


<h2 className="text-3xl font-bold mt-2">

{item.value}

</h2>


</div>




<div className="bg-blue-100 p-3 rounded-xl">

<Icon className="text-blue-600"/>

</div>



</div>


</div>


);


})


}


</div>









<div className="bg-white rounded-2xl p-8 border shadow-sm">


<h2 className="text-xl font-semibold">

Builder Intelligence

</h2>


<p className="text-gray-500 mt-2">

Track your inventory, AI property analysis and listing performance.

</p>



</div>






<div className="grid md:grid-cols-3 gap-6">



<div className="bg-white border rounded-2xl p-6">

<Building2 className="text-blue-600 mb-3"/>

<h3 className="font-semibold">

Property Management

</h3>

<p className="text-gray-500 text-sm mt-2">

Manage your property listings and uploads.

</p>

</div>





<div className="bg-white border rounded-2xl p-6">

<TrendingUp className="text-green-600 mb-3"/>

<h3 className="font-semibold">

Market Insights

</h3>

<p className="text-gray-500 text-sm mt-2">

AI powered property intelligence.

</p>

</div>





<div className="bg-white border rounded-2xl p-6">

<FileText className="text-purple-600 mb-3"/>

<h3 className="font-semibold">

AI Reports

</h3>

<p className="text-gray-500 text-sm mt-2">

Analyze property quality and investment potential.

</p>

</div>



</div>





</div>


</DashboardLayout>


</AuthGuard>


);


}