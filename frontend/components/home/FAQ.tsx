"use client";

import { useState } from "react";

import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";



const faqs = [

{
question:
"What is PropIntel AI?",

answer:
"PropIntel AI is an AI-powered real estate intelligence platform that analyzes properties, identifies risks and provides investment insights before you make decisions.",
},


{
question:
"How does AI property analysis work?",

answer:
"You can add property details and upload images. Our AI analyzes property conditions, risks, investment potential and generates a detailed report.",
},


{
question:
"Can PropIntel AI predict property investment potential?",

answer:
"Yes. PropIntel AI provides investment scores and recommendations based on property information and AI analysis.",
},


{
question:
"Is my property data secure?",

answer:
"Yes. Your property information and generated reports are protected using secure technology and authentication.",
},


{
question:
"Who can use PropIntel AI?",

answer:
"Home buyers, real estate investors, property consultants and professionals can use PropIntel AI to make smarter decisions.",
},


{
question:
"Can I download AI reports?",

answer:
"Yes. You can generate and download professional AI property reports in PDF format.",
},


];





export default function FAQ(){


const [open,setOpen] =
useState<number | null>(null);



return(


<section
id="faq"
className="scroll-mt-24 py-24"
>


<div className="mx-auto max-w-5xl px-6">





<div className="text-center">


<div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">


<HelpCircle size={16}/>

FAQ

</div>





<h2 className="mt-6 text-4xl font-bold md:text-5xl">

Frequently Asked Questions

</h2>



<p className="mt-4 text-lg text-gray-500">

Everything you need to know about PropIntel AI.

</p>



</div>








<div className="mt-12 space-y-5">


{
faqs.map((faq,index)=>{


const active =
open===index;



return(


<div

key={index}

className="rounded-2xl border bg-white shadow-sm"

>


<button

onClick={()=>setOpen(
active ? null : index
)}

className="flex w-full items-center justify-between p-6 text-left"

>


<h3 className="font-semibold text-lg">

{faq.question}

</h3>



<ChevronDown

size={22}

className={`transition ${
active ? "rotate-180 text-blue-600" : ""
}`}

/>


</button>








{

active && (

<div className="px-6 pb-6 text-gray-500 leading-relaxed">


{faq.answer}


</div>

)

}



</div>


);


})

}



</div>







</div>


</section>


);


}