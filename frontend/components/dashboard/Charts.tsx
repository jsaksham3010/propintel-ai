"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";


import {
  getDashboardStats,
} from "@/services/dashboardService";



const COLORS = [
  "#16a34a",
  "#f59e0b",
  "#dc2626",
];





export default function Charts(){


const [riskData,setRiskData] =
useState<any[]>([]);


const [typeData,setTypeData] =
useState<any[]>([]);





useEffect(()=>{


const fetchCharts = async()=>{


try{


const data =
await getDashboardStats();



setRiskData([

{
name:"Low Risk",
value:data.riskDistribution.low,
},

{
name:"Medium Risk",
value:data.riskDistribution.medium,
},

{
name:"High Risk",
value:data.riskDistribution.high,
},

]);





setTypeData(

Object.keys(
data.propertyTypes
).map((key)=>({

name:key,

value:data.propertyTypes[key],

}))

);



}

catch(err){

console.error(
"Chart Error",
err
);

}


};


fetchCharts();


},[]);






return(


<div className="grid gap-6 lg:grid-cols-2">





{/* Risk */}

<div className="rounded-3xl border bg-white p-6 shadow-sm">


<h2 className="mb-6 text-xl font-bold text-gray-900">

AI Risk Distribution

</h2>





<ResponsiveContainer

width="100%"

height={300}

>


<PieChart>


<Pie

data={riskData}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>


{
riskData.map(

(entry,index)=>(


<Cell

key={index}

fill={
COLORS[index]
}

/>


)

)

}


</Pie>



<Tooltip/>


<Legend/>


</PieChart>


</ResponsiveContainer>



</div>









{/* Property Types */}

<div className="rounded-3xl border bg-white p-6 shadow-sm">


<h2 className="mb-6 text-xl font-bold text-gray-900">

Property Types

</h2>





<ResponsiveContainer

width="100%"

height={300}

>


<BarChart

data={typeData}

>


<XAxis

dataKey="name"

/>


<YAxis/>


<Tooltip/>


<Legend/>





<Bar

dataKey="value"

fill="#2563eb"

radius={[
10,
10,
0,
0
]}

/>



</BarChart>


</ResponsiveContainer>



</div>





</div>


);


}