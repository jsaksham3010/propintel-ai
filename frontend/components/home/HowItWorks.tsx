import {
  PlusCircle,
  UploadCloud,
  Sparkles,
  FileText,
} from "lucide-react";



const steps = [

{
icon: PlusCircle,
number:"01",
title:"Add Property",
description:
"Enter your property details including location, price and basic information.",
},


{
icon: UploadCloud,
number:"02",
title:"Upload Images",
description:
"Upload property images and documents for AI powered inspection.",
},


{
icon: Sparkles,
number:"03",
title:"AI Analysis",
description:
"Gemini AI analyzes condition, risks, investment potential and opportunities.",
},


{
icon: FileText,
number:"04",
title:"Get Smart Report",
description:
"Receive detailed AI reports with scores, recommendations and insights.",
},


];





export default function HowItWorks(){


return(


<section
id="how-it-works"
className="scroll-mt-24 bg-gray-50 py-24"
>


<div className="mx-auto max-w-7xl px-6">





<div className="text-center">


<h2 className="text-4xl font-bold md:text-5xl">

How PropIntel AI Works

</h2>


<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">

From property upload to AI insights, get complete intelligence in four simple steps.

</p>


</div>







<div className="relative mt-16 grid gap-8 md:grid-cols-4">





{
steps.map((step,index)=>{


const Icon = step.icon;


return(


<div

key={step.number}

className="relative rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"

>





<div className="flex items-center justify-between">


<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">

<Icon

size={28}

className="text-white"

/>

</div>



<span className="text-4xl font-extrabold text-blue-100">

{step.number}

</span>


</div>







<h3 className="mt-6 text-xl font-bold">

{step.title}

</h3>



<p className="mt-3 leading-relaxed text-gray-500">

{step.description}

</p>






{
index !== steps.length-1 && (

<div className="absolute -right-5 top-16 hidden h-[2px] w-10 bg-blue-200 lg:block"/>

)

}



</div>


);


})

}




</div>





<div className="mt-16 rounded-3xl bg-blue-600 p-8 text-center text-white">


<Sparkles

className="mx-auto"

size={32}

/>


<h3 className="mt-4 text-2xl font-bold">

Real Estate Decisions Powered By Intelligence

</h3>


<p className="mx-auto mt-3 max-w-2xl text-blue-100">

Stop guessing. Let AI analyze your property before you invest.

</p>



</div>






</div>


</section>


);


}