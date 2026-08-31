"use client";

import {
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  Wrench,
  PaintBucket,
  Lightbulb,
  Download,
} from "lucide-react";

import { generateReportPDF } from "@/utils/generateReportPDF";


interface AIReportProps {

  report?: {

    overallScore?: number;
    condition?: string;
    wallCondition?: string;
    paintCondition?: string;
    floorCondition?: string;
    lighting?: string;
    cleanliness?: string;
    estimatedMaintenanceCost?: string;
    riskLevel?: string;
    recommendations?: string[];
    summary?: string;

  };


  property?: {

    title?: string;
    city?: string;
    state?: string;
    propertyType?: string;
    price?: number;
    area?: number;

    images?: {
      url:string;
    }[];

  };

}



export default function AIReport({
  report,
  property,
}:AIReportProps){



  if(!report){

    return (

      <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">

        <div className="flex items-center gap-3">

          <Sparkles
            className="text-indigo-600"
            size={28}
          />

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


    if(!property){

      alert("Property details missing");

      return;

    }


    generateReportPDF(
      report,
      property
    );


  };





  return (

    <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">


      <div className="flex items-center justify-between mb-8">


        <div className="flex items-center gap-3">

          <Sparkles
            className="text-indigo-600"
            size={28}
          />

          <h2 className="text-2xl font-bold">
            AI Property Report
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





      <div className="grid gap-5 md:grid-cols-3">


        <div className="rounded-2xl bg-green-50 p-5">

          <p className="text-sm text-gray-500">
            Overall Score
          </p>


          <h3 className="mt-2 text-4xl font-bold text-green-600">

            {report.overallScore || 0}/100

          </h3>

        </div>




        <div className="rounded-2xl bg-red-50 p-5">

          <ShieldAlert className="text-red-600"/>


          <p className="mt-2 text-sm text-gray-500">
            Risk Level
          </p>


          <h3 className="font-bold">

            {report.riskLevel || "-"}

          </h3>


        </div>




        <div className="rounded-2xl bg-yellow-50 p-5">

          <p className="text-sm text-gray-500">
            Maintenance Cost
          </p>


          <h3 className="font-bold">

            {report.estimatedMaintenanceCost || "-"}

          </h3>

        </div>


      </div>





      <div className="mt-8 grid gap-5 md:grid-cols-2">


        <div className="rounded-2xl border p-5">

          <h3 className="flex gap-2 font-bold">

            <Wrench size={20}/>

            Condition

          </h3>


          <p className="mt-3 text-gray-600">

            {report.condition || "-"}

          </p>


        </div>





        <div className="rounded-2xl border p-5">

          <h3 className="flex gap-2 font-bold">

            <PaintBucket size={20}/>

            Paint Condition

          </h3>


          <p className="mt-3 text-gray-600">

            {report.paintCondition || "-"}

          </p>


        </div>





        <div className="rounded-2xl border p-5">

          <h3 className="flex gap-2 font-bold">

            <Lightbulb size={20}/>

            Lighting

          </h3>


          <p className="mt-3 text-gray-600">

            {report.lighting || "-"}

          </p>


        </div>





        <div className="rounded-2xl border p-5">


          <h3 className="font-bold">
            Floor Condition
          </h3>


          <p className="mt-3 text-gray-600">

            {report.floorCondition || "-"}

          </p>


        </div>


      </div>






      <div className="mt-8 rounded-2xl bg-indigo-50 p-6">


        <h3 className="text-xl font-bold">
          AI Summary
        </h3>


        <p className="mt-3 text-gray-700">

          {report.summary || "-"}

        </p>


      </div>






      <div className="mt-8 rounded-2xl bg-green-50 p-6">


        <h3 className="flex items-center gap-2 text-xl font-bold text-green-700">

          <CheckCircle2/>

          Recommendations

        </h3>



        <ul className="mt-4 space-y-2">


          {(report.recommendations || []).map(

            (item,index)=>(

              <li key={index}>
                • {item}
              </li>

            )

          )}


        </ul>


      </div>




    </div>

  );

}