import {
  ShieldCheck,
  Brain,
  Zap,
  Target,
  Lock,
  TrendingUp,
} from "lucide-react";



const reasons = [

{
icon:Brain,
title:"AI Driven Decisions",
description:
"Advanced AI models analyze property data and provide intelligent investment insights.",
},


{
icon:ShieldCheck,
title:"Reduce Investment Risk",
description:
"Identify hidden risks, maintenance issues and property concerns before investing.",
},


{
icon:TrendingUp,
title:"Better Returns",
description:
"Understand growth potential and make data-backed real estate decisions.",
},


{
icon:Zap,
title:"Instant Analysis",
description:
"Get detailed property intelligence within minutes instead of manual research.",
},


{
icon:Lock,
title:"Secure Platform",
description:
"Your property information and reports are protected with secure technology.",
},


{
icon:Target,
title:"Built For Investors",
description:
"Designed for buyers, investors and real estate professionals.",
},


];





export default function WhyChooseUs(){


return(


<section
id="why-us"
className="scroll-mt-24 py-24"
>


<div className="mx-auto max-w-7xl px-6">






<div className="grid items-center gap-12 lg:grid-cols-2">






<div>


<div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">

Why Choose PropIntel AI

</div>





<h2 className="mt-6 text-4xl font-bold md:text-5xl">

Real Estate Intelligence

<br/>

Powered By AI

</h2>






<p className="mt-5 text-lg leading-relaxed text-gray-500">


Buying property is a major financial decision. PropIntel AI helps you analyze opportunities, understand risks and invest with confidence.


</p>








<div className="mt-8 grid gap-5 sm:grid-cols-2">


{
reasons.map((item)=>{


const Icon=item.icon;


return(


<div

key={item.title}

className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"

>


<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">


<Icon

size={22}

className="text-blue-600"

/>


</div>




<h3 className="mt-4 font-bold">

{item.title}

</h3>




<p className="mt-2 text-sm text-gray-500">

{item.description}

</p>


</div>


);


})

}


</div>



</div>









{/* Right side AI trust card */}


<div className="rounded-3xl border bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white shadow-2xl">





<h3 className="text-2xl font-bold">

Smart Property Intelligence

</h3>


<p className="mt-3 text-blue-100">

Every decision backed by AI insights.

</p>







<div className="mt-8 space-y-4">



<div className="rounded-2xl bg-white/10 p-5 backdrop-blur">


<p className="text-sm text-blue-100">

Investment Analysis

</p>


<h4 className="mt-2 text-3xl font-bold">

92/100

</h4>


</div>







<div className="rounded-2xl bg-white/10 p-5 backdrop-blur">


<p className="text-sm text-blue-100">

Risk Detection

</p>


<h4 className="mt-2 text-xl font-bold">

Low Risk Property

</h4>


</div>








<div className="rounded-2xl bg-white/10 p-5 backdrop-blur">


<p className="text-sm text-blue-100">

AI Recommendation

</p>


<h4 className="mt-2 text-xl font-bold">

Strong Investment Opportunity

</h4>


</div>





</div>






</div>







</div>





</div>


</section>


);


}