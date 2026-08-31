"use client";

import Link from "next/link";

import {
  Plus,
  FileText,
  Sparkles,
  ArrowRight,
} from "lucide-react";


import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";


import StatsCards from "@/components/dashboard/StatsCards";
import Charts from "@/components/dashboard/Charts";
import RecentProperties from "@/components/dashboard/RecentProperties";
import AIReports from "@/components/dashboard/AIReports";




export default function DashboardPage() {


return (

<AuthGuard>

<DashboardLayout>


<div className="space-y-10">





{/* Hero */}

<section className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">


<div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">


<div>


<h1 className="text-4xl font-bold">

Welcome back 👋

</h1>



<p className="mt-3 max-w-2xl text-blue-100">

Monitor your properties, generate AI inspection reports and manage your real estate portfolio from one place.

</p>


</div>







<div className="flex flex-wrap gap-3">


<Link

href="/properties/add"

className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 hover:bg-blue-50"

>


<Plus size={18}/>

Add Property


</Link>





<Link

href="/reports"

className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400"

>


<FileText size={18}/>

AI Reports


</Link>



</div>



</div>


</section>









{/* Stats */}

<section>

<StatsCards />

</section>









{/* Analytics */}

<section>


<Charts />


</section>









{/* AI Reports */}

<section className="rounded-3xl border bg-white p-8 shadow-sm">


<div className="mb-6 flex items-center justify-between">


<div className="flex items-center gap-3">


<div className="rounded-xl bg-purple-100 p-3">

<Sparkles

className="text-purple-600"

/>

</div>




<div>


<h2 className="text-2xl font-bold">

AI Intelligence

</h2>


<p className="text-gray-500">

Latest Gemini AI property analysis

</p>


</div>



</div>






<Link

href="/reports"

className="flex items-center gap-2 font-medium text-blue-600"

>


View All

<ArrowRight size={18}/>


</Link>



</div>





<AIReports />



</section>









{/* Recent Properties */}

<section>


<RecentProperties />


</section>





</div>


</DashboardLayout>


</AuthGuard>


);


}