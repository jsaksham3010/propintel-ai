"use client";

import { useEffect, useState } from "react";

import {
  Users,
  Building2,
  UserCheck,
  FileText,
  Star,
  ShieldCheck,
} from "lucide-react";

import {
  getDashboardStats,
} from "@/services/dashboardService";



export default function AdminStatsCards(){


const [stats,setStats] = useState({

  totalUsers:0,

  totalBuilders:0,

  totalBuyers:0,

  totalAdmins:0,

  totalProperties:0,

  aiReports:0,

  averageScore:0,

});


const [loading,setLoading] = useState(true);

const [error,setError] = useState("");







useEffect(()=>{


const fetchStats = async()=>{


try{


const data = await getDashboardStats();


setStats(data.stats);



}

catch(err){


console.error(
"Admin Stats Error:",
err
);


setError(
"Unable to load admin statistics"
);


}

finally{


setLoading(false);


}



};



fetchStats();



},[]);









const cards = [

{

title:"Total Users",

value:stats.totalUsers,

description:"Registered Users",

icon:Users,

color:"bg-blue-100 text-blue-600"

},



{

title:"Builders",

value:stats.totalBuilders,

description:"Property Dealers",

icon:UserCheck,

color:"bg-green-100 text-green-600"

},



{

title:"Buyers",

value:stats.totalBuyers,

description:"Property Seekers",

icon:Users,

color:"bg-purple-100 text-purple-600"

},



{

title:"Properties",

value:stats.totalProperties,

description:"Total Listings",

icon:Building2,

color:"bg-orange-100 text-orange-600"

},



{

title:"AI Reports",

value:stats.aiReports,

description:"Generated Reports",

icon:FileText,

color:"bg-indigo-100 text-indigo-600"

},



{

title:"AI Score",

value:`${stats.averageScore}%`,

description:"Average Intelligence Score",

icon:Star,

color:"bg-yellow-100 text-yellow-600"

},



{

title:"Admins",

value:stats.totalAdmins,

description:"Platform Admins",

icon:ShieldCheck,

color:"bg-red-100 text-red-600"

},


];









if(loading){

return (

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

{[1,2,3,4].map((item)=>(

<div

key={item}

className="h-32 rounded-2xl bg-gray-100 animate-pulse"

/>

))}

</div>

);

}








if(error){

return (

<div className="rounded-xl bg-red-50 p-4 text-red-600">

{error}

</div>

);

}








return (

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">


{

cards.map((card)=>{


const Icon = card.icon;


return (

<div

key={card.title}

className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"

>


<div className="flex items-center justify-between">


<div>


<p className="text-sm text-gray-500">

{card.title}

</p>


<h2 className="mt-3 text-3xl font-bold text-gray-900">

{card.value}

</h2>


<p className="mt-2 text-sm text-gray-400">

{card.description}

</p>


</div>




<div className={`rounded-xl p-3 ${card.color}`}>

<Icon size={26}/>

</div>



</div>



</div>


);


})


}


</div>

);


}