"use client";

import { useEffect, useState } from "react";

import {
  User,
  Mail,
  Calendar,
  Home,
  Sparkles,
  Star,
  LogOut,
} from "lucide-react";

import { getDashboardStats } from "@/services/dashboardService";


export default function ProfilePage() {


  const [user,setUser] = useState<any>(null);


  const [stats,setStats] = useState({

    totalProperties:0,

    aiReports:0,

    averageScore:0,

  });




  useEffect(()=>{


    const storedUser =
      localStorage.getItem("user");


    if(storedUser){

      setUser(
        JSON.parse(storedUser)
      );

    }




    const loadStats = async()=>{


      try{


        const data =
          await getDashboardStats();


        setStats(
          data.stats
        );


      }
      catch(err){

        console.error(
          "Profile Stats Error",
          err
        );

      }


    };


    loadStats();


  },[]);







  const handleLogout=()=>{


    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href="/login";


  };






return (

<div className="min-h-screen bg-gray-50 py-10 px-6">


<div className="mx-auto max-w-6xl">





{/* Header */}


<div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">


<div className="flex items-center gap-6">


<div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-bold text-blue-600">


{user?.fullName?.charAt(0)?.toUpperCase() || "U"}


</div>




<div>


<h1 className="text-4xl font-bold">

{user?.fullName || "User"}

</h1>



<p className="mt-2 flex items-center gap-2">

<Mail size={18}/>

{user?.email || "-"}

</p>




<p className="mt-2 flex items-center gap-2">

<Calendar size={18}/>

PropIntel AI Member

</p>


</div>


</div>


</div>







{/* Stats */}



<div className="mt-8 grid gap-6 md:grid-cols-3">



<div className="rounded-3xl border bg-white p-6 shadow-sm">

<Home
className="text-blue-600"
size={32}
/>


<p className="mt-4 text-gray-500">

Properties

</p>


<h2 className="text-3xl font-bold">

{stats.totalProperties}

</h2>


</div>






<div className="rounded-3xl border bg-white p-6 shadow-sm">


<Sparkles
className="text-indigo-600"
size={32}
/>


<p className="mt-4 text-gray-500">

AI Reports

</p>


<h2 className="text-3xl font-bold">

{stats.aiReports}

</h2>


</div>






<div className="rounded-3xl border bg-white p-6 shadow-sm">


<Star
className="text-yellow-500"
size={32}
/>


<p className="mt-4 text-gray-500">

Average Score

</p>


<h2 className="text-3xl font-bold">

{stats.averageScore}%

</h2>


</div>



</div>









{/* Account */}


<div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">


<h2 className="mb-6 text-2xl font-bold">

Account Information

</h2>




<div className="space-y-5">


<div className="flex items-center gap-4">


<User className="text-blue-600"/>


<div>

<p className="text-gray-500">

Full Name

</p>


<h3 className="font-semibold">

{user?.fullName || "-"}

</h3>


</div>


</div>






<div className="flex items-center gap-4">


<Mail className="text-blue-600"/>


<div>

<p className="text-gray-500">

Email

</p>


<h3 className="font-semibold">

{user?.email || "-"}

</h3>


</div>


</div>



</div>






<button

onClick={handleLogout}

className="mt-8 flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-white hover:bg-red-600"

>


<LogOut size={18}/>

Logout


</button>



</div>





</div>


</div>


);


}