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

import { useEffect, useState } from "react";

import { getDashboardStats } from "@/services/dashboardService";


export default function Charts() {


  const [riskData, setRiskData] = useState<any[]>([]);
  const [typeData, setTypeData] = useState<any[]>([]);


  useEffect(() => {

    const fetchCharts = async () => {

      try {

        const data = await getDashboardStats();


        const risk = data.riskDistribution;


        setRiskData([
          {
            name: "Low Risk",
            value: risk.low,
          },
          {
            name: "Medium Risk",
            value: risk.medium,
          },
          {
            name: "High Risk",
            value: risk.high,
          },
        ]);



        const types = data.propertyTypes;


        setTypeData(
          Object.keys(types).map((key)=>({
            name:key,
            value:types[key],
          }))
        );


      } catch(error){

        console.error(
          "Chart Error",
          error
        );

      }

    };


    fetchCharts();


  },[]);



  return (

    <div className="mt-10 grid gap-6 lg:grid-cols-2">


      {/* Risk Distribution */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-xl font-bold">
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

              {riskData.map(
                (entry,index)=>(
                  <Cell key={index}/>
                )
              )}

            </Pie>


            <Tooltip />

            <Legend />

          </PieChart>


        </ResponsiveContainer>


      </div>





      {/* Property Types */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">


        <h2 className="mb-6 text-xl font-bold">
          Property Types
        </h2>


        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={typeData}>


            <XAxis dataKey="name"/>

            <YAxis/>

            <Tooltip/>

            <Legend/>


            <Bar
              dataKey="value"
              radius={[8,8,0,0]}
            />


          </BarChart>


        </ResponsiveContainer>


      </div>



    </div>

  );

}