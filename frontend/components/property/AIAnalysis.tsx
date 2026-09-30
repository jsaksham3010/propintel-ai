"use client";

import {
  useState,
} from "react";

import {
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";


import {
  analyzeProperty,
} from "@/services/aiservice";



interface AIAnalysisProps {

  propertyId:string;

  onAnalysisComplete:()=>void;

  hasReport?:boolean;

}





export default function AIAnalysis({

propertyId,

onAnalysisComplete,

hasReport=false,

}:AIAnalysisProps){



const [loading,setLoading] =

useState(false);



const [success,setSuccess] =

useState("");



const [error,setError] =

useState("");









const handleAnalyze = async()=>{


if(loading)
return;



try{


setLoading(true);

setSuccess("");

setError("");





const response =

await analyzeProperty(propertyId);






setSuccess(

response.message ||

"AI analysis completed successfully."

);





onAnalysisComplete();



}

catch(err:any){


console.error(

"AI Analysis Error:",

err

);



setError(

err?.response?.data?.message ||

"Failed to analyze this property."

);



}

finally{


setLoading(false);


}


};









return (

<div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">





<div className="flex items-center gap-3">


<div className="rounded-xl bg-indigo-100 p-3">


<Sparkles

className="text-indigo-600"

size={24}

/>


</div>



<div>


<h2 className="text-2xl font-bold">

AI Property Inspection

</h2>



<p className="text-gray-500">

Gemini AI powered property intelligence

</p>


</div>



</div>








<p className="mt-5 text-gray-600">


Analyze property images to generate:

</p>



<ul className="mt-3 space-y-2 text-gray-600">


<li>
✓ Property condition analysis
</li>


<li>
✓ Structural risk detection
</li>


<li>
✓ Investment potential
</li>


<li>
✓ Maintenance recommendations
</li>


</ul>









{

success && (

<div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">


<CheckCircle size={20}/>


{success}


</div>

)

}









{

error && (

<div className="mt-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">


<AlertCircle size={20}/>


{error}


</div>

)

}









<button

onClick={handleAnalyze}

disabled={loading}

className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"

>


{

loading

?

<>

<Loader2

className="animate-spin"

size={20}

/>

Analyzing Property...

</>


:

<>

<Sparkles size={20}/>

{

hasReport

?

"Regenerate AI Report"

:

"Analyze with AI"

}


</>

}



</button>






{

loading && (

<p className="mt-3 text-sm text-gray-500">

AI inspection may take up to 1-2 minutes depending on image count.

</p>

)

}






</div>

);


}