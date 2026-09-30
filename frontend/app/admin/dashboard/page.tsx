"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";

import AdminStatsCards from "@/components/dashboard/AdminStatsCards";
import Charts from "@/components/dashboard/Charts";

import {
  ShieldCheck,
  Users,
  Building2,
  Sparkles,
} from "lucide-react";



export default function AdminDashboard(){


return (

<AuthGuard allowedRoles={["admin"]}>


<DashboardLayout>


<div className="space-y-10">





{/* Header */}

<section>

<div className="flex items-center gap-3">


<div className="rounded-xl bg-blue-100 p-3">

<ShieldCheck

className="text-blue-600"

size={28}

/>

</div>




<div>


<h1 className="text-3xl font-bold text-gray-900">

Admin Dashboard

</h1>


<p className="mt-2 text-gray-500">

Manage users, properties and AI intelligence platform.

</p>


</div>


</div>


</section>







{/* Admin Stats */}

<section>


<AdminStatsCards />


</section>








{/* Analytics */}

<section>


<div className="mb-6 flex items-center gap-3">


<div className="rounded-xl bg-purple-100 p-3">


<Sparkles

className="text-purple-600"

size={24}

/>


</div>




<div>


<h2 className="text-2xl font-bold text-gray-900">

Platform Analytics

</h2>


<p className="text-gray-500">

AI risk analysis and property distribution

</p>


</div>



</div>




<Charts />


</section>









{/* Admin Controls */}

<section>


<div className="grid gap-6 md:grid-cols-3">





<div className="rounded-2xl border bg-white p-6 shadow-sm">


<Users

className="text-blue-600 mb-4"

/>


<h3 className="text-xl font-semibold">

User Management

</h3>


<p className="mt-2 text-gray-500">

Manage buyers, builders and platform users.

</p>


</div>







<div className="rounded-2xl border bg-white p-6 shadow-sm">


<Building2

className="text-green-600 mb-4"

/>


<h3 className="text-xl font-semibold">

Property Management

</h3>


<p className="mt-2 text-gray-500">

Monitor all property listings.

</p>


</div>








<div className="rounded-2xl border bg-white p-6 shadow-sm">


<Sparkles

className="text-purple-600 mb-4"

/>


<h3 className="text-xl font-semibold">

AI Intelligence

</h3>


<p className="mt-2 text-gray-500">

Track AI reports and property insights.

</p>


</div>





</div>


</section>






</div>



</DashboardLayout>



</AuthGuard>


);


}