import {
  Globe2,
  Lightbulb,
  Rocket,
  Users,
} from "lucide-react";



const visionPoints = [

{
icon:Globe2,
title:"Transform Real Estate Decisions",
description:
"Our vision is to make property intelligence accessible to every buyer and investor.",
},


{
icon:Lightbulb,
title:"Data Before Decisions",
description:
"We believe every property decision should be backed by insights instead of assumptions.",
},


{
icon:Rocket,
title:"Future Of Property Investing",
description:
"Building the next generation AI platform for smarter real estate experiences.",
},


{
icon:Users,
title:"For Everyone",
description:
"Helping individuals, investors and professionals make confident choices.",
},


];





export default function OurVision(){


return(


<section
id="vision"
className="scroll-mt-24 bg-gray-50 py-24"
>


<div className="mx-auto max-w-7xl px-6">





<div className="mx-auto max-w-3xl text-center">


<span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">

Our Vision

</span>




<h2 className="mt-6 text-4xl font-bold md:text-5xl">


Building The Future Of

<br/>

AI Powered Real Estate


</h2>




<p className="mt-5 text-lg text-gray-500">


PropIntel AI aims to redefine how people discover, analyze and invest in properties by combining artificial intelligence with real estate intelligence.


</p>



</div>








<div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">



{
visionPoints.map((item)=>{


const Icon=item.icon;


return(


<div

key={item.title}

className="rounded-3xl border bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"

>


<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">


<Icon

size={26}

className="text-white"

/>


</div>





<h3 className="mt-6 text-xl font-bold">

{item.title}

</h3>




<p className="mt-3 text-sm leading-relaxed text-gray-500">

{item.description}

</p>




</div>


);


})

}



</div>








<div className="mt-16 rounded-3xl bg-white border p-10 text-center shadow-sm">


<h3 className="text-3xl font-bold">

The Future Is Intelligent

</h3>



<p className="mx-auto mt-4 max-w-2xl text-gray-500">


From property discovery to investment analysis, PropIntel AI is creating a smarter ecosystem where every decision is powered by intelligence.


</p>



</div>





</div>


</section>


);


}