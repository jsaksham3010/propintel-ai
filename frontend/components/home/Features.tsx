import {
  Brain,
  FileCheck,
  ShieldCheck,
  BarChart3,
  Building2,
  Bot,
  Sparkles,
} from "lucide-react";


const features = [

{
icon: Brain,
title:"AI Property Analysis",
description:
"Upload property details and images to get instant AI powered inspection, condition analysis and smart insights.",
},

{
icon: BarChart3,
title:"Investment Score",
description:
"Understand ROI potential with AI generated investment ratings and market intelligence.",
},

{
icon: ShieldCheck,
title:"Risk Detection",
description:
"Identify property risks, maintenance issues and possible investment concerns before buying.",
},


{
icon: FileCheck,
title:"Smart Reports",
description:
"Generate professional AI reports with recommendations, scores and detailed analysis.",
},


{
icon: Building2,
title:"Property Intelligence",
description:
"Organize and analyze your complete real estate portfolio from one dashboard.",
},


{
icon: Bot,
title:"AI Assistant",
description:
"Ask questions and get instant AI guidance for smarter property decisions.",
},


];




export default function Features(){


return(

<section
id="features"
className="scroll-mt-24 py-24"
>


<div className="mx-auto max-w-7xl px-6">





<div className="text-center">


<div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">

<Sparkles size={16}/>

Powerful AI Capabilities

</div>





<h2 className="mt-6 text-4xl font-bold md:text-5xl">

Everything You Need

<br/>

Before Investing

</h2>





<p className="mx-auto mt-5 max-w-2xl text-gray-500 text-lg">

PropIntel AI combines artificial intelligence and real estate intelligence to help you make confident property decisions.

</p>


</div>









<div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">


{
features.map((feature)=>{


const Icon = feature.icon;


return(


<div

key={feature.title}

className="group rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"

>


<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 transition group-hover:bg-blue-600">


<Icon

size={28}

className="text-blue-600 group-hover:text-white"

/>


</div>






<h3 className="mt-6 text-xl font-bold">

{feature.title}

</h3>






<p className="mt-3 leading-relaxed text-gray-500">

{feature.description}

</p>






<div className="mt-6 text-sm font-semibold text-blue-600">

Learn More →

</div>




</div>


);


})

}


</div>





</div>


</section>


);


}