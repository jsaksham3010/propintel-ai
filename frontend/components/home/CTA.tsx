import Link from "next/link";

import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";



export default function CTA(){


return(


<section
id="contact"
className="scroll-mt-24 py-24"
>


<div className="mx-auto max-w-7xl px-6">





<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white shadow-2xl md:p-16">





<div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"/>


<div className="absolute -bottom-20 -left-20 h-72 h-72 rounded-full bg-white/10 blur-3xl"/>







<div className="relative z-10 text-center">


<div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">


<Sparkles size={16}/>

Start Your AI Property Journey

</div>







<h2 className="mt-8 text-4xl font-extrabold md:text-6xl">


Make Smarter

<br/>

Real Estate Decisions Today

</h2>







<p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">


Analyze properties, understand risks and discover investment opportunities with the power of artificial intelligence.


</p>







<div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">


<Link

href="/register"

className="flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-blue-600 hover:bg-gray-100"

>

Create Free Account

<ArrowRight size={18}/>

</Link>






<Link

href="/login"

className="rounded-xl border border-white/40 px-8 py-4 font-semibold text-white hover:bg-white/10"

>

Login

</Link>



</div>







<div className="mt-12 grid gap-5 md:grid-cols-3">





<div className="rounded-2xl bg-white/10 p-5 backdrop-blur">


<ShieldCheck className="mx-auto"/>


<p className="mt-3 font-semibold">

Secure Analysis

</p>


</div>







<div className="rounded-2xl bg-white/10 p-5 backdrop-blur">


<TrendingUp className="mx-auto"/>


<p className="mt-3 font-semibold">

Investment Insights

</p>


</div>







<div className="rounded-2xl bg-white/10 p-5 backdrop-blur">


<Sparkles className="mx-auto"/>


<p className="mt-3 font-semibold">

AI Powered Reports

</p>


</div>






</div>





</div>





</div>





</div>


</section>


);


}