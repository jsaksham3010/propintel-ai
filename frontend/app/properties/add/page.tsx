"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";

import { createProperty } from "@/services/propertyService";



export default function AddPropertyPage() {


const router = useRouter();


const [user,setUser] = useState<any>(null);


const [form,setForm] = useState({

title:"",

city:"",

state:"",

price:"",

area:"",

propertyType:"Apartment",

});



const [error,setError] = useState("");

const [loading,setLoading] = useState(false);







useEffect(()=>{


const storedUser =
localStorage.getItem("user");


if(storedUser){

setUser(
JSON.parse(storedUser)
);

}



},[]);








const handleChange = (

e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>

)=>{


setForm({

...form,

[e.target.name]:e.target.value,

});


};








const submit = async(

e:React.FormEvent

)=>{


e.preventDefault();


setError("");




if(

!form.title ||

!form.city ||

!form.state ||

!form.price ||

!form.area

){


setError(

"Please fill all required fields."

);


return;


}







try{


setLoading(true);



await createProperty({

title:form.title,

city:form.city,

state:form.state,

price:Number(form.price),

area:Number(form.area),

propertyType:

form.propertyType as

"Apartment" |

"Villa" |

"Plot" |

"Commercial",


});



router.push("/properties");



}

catch(err:any){


console.error(

"Create Property Error:",

err

);



setError(

err.response?.data?.message ||

"Failed to create property."

);


}

finally{


setLoading(false);


}



};








return (

<AuthGuard>


<DashboardLayout>



<div className="min-h-screen bg-gray-50 p-8">



<div className="mx-auto max-w-3xl">






<div className="rounded-3xl border bg-white p-8 shadow-sm">





<h1 className="text-3xl font-bold text-gray-900">


{

user?.role==="builder"

?

"Add New Listing"

:

"Add New Property"

}



</h1>





<p className="mt-2 text-gray-500">

Add property details and generate AI intelligence reports.

</p>








{

error &&


<div className="mt-6 rounded-xl bg-red-50 p-4 text-red-600">

{error}

</div>


}









<form

onSubmit={submit}

className="mt-8 space-y-5"

>







<input

name="title"

placeholder="Property Title"

value={form.title}

onChange={handleChange}

className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"

required

/>







<input

name="city"

placeholder="City"

value={form.city}

onChange={handleChange}

className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"

required

/>







<input

name="state"

placeholder="State"

value={form.state}

onChange={handleChange}

className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"

required

/>








<div className="grid gap-5 md:grid-cols-2">



<input

name="price"

type="number"

placeholder="Price (₹)"

value={form.price}

onChange={handleChange}

className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"

required

/>






<input

name="area"

type="number"

placeholder="Area (sq ft)"

value={form.area}

onChange={handleChange}

className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"

required

/>





</div>









<select

name="propertyType"

value={form.propertyType}

onChange={handleChange}

className="w-full rounded-xl border p-3"

>


<option value="Apartment">

Apartment

</option>


<option value="Villa">

Villa

</option>


<option value="Plot">

Plot

</option>


<option value="Commercial">

Commercial

</option>



</select>









<button

disabled={loading}

className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"

>


{

loading

?

"Creating..."

:

"Create Property"

}



</button>








</form>








</div>


</div>


</div>




</DashboardLayout>


</AuthGuard>


);


}