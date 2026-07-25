"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "@/services/propertyService";


export default function AddPropertyPage(){

const router = useRouter();


const [form,setForm] = useState({

title:"",
city:"",
state:"",
price:"",
area:"",
propertyType:"Apartment"

});


const [error,setError]=useState("");



const handleChange=(e:any)=>{

setForm({
...form,
[e.target.name]:e.target.value
});

};



const submit=async(e:any)=>{

e.preventDefault();


try{


await createProperty({

...form,

price:Number(form.price),

area:Number(form.area)

});


router.push("/properties");


}

catch(err:any){

setError(
err.response?.data?.message ||
"Failed"
);

}


};



return (

<div className="p-8 bg-gray-50 min-h-screen">


<div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow">


<h1 className="text-3xl font-bold mb-6">
Add Property
</h1>


{error && (
<p className="text-red-500 mb-4">
{error}
</p>
)}



<form
onSubmit={submit}
className="space-y-4"
>


<input
name="title"
placeholder="Property Title"
className="w-full border p-3 rounded-xl"
onChange={handleChange}
/>



<input
name="city"
placeholder="City"
className="w-full border p-3 rounded-xl"
onChange={handleChange}
/>



<input
name="state"
placeholder="State"
className="w-full border p-3 rounded-xl"
onChange={handleChange}
/>



<input
name="price"
type="number"
placeholder="Price"
className="w-full border p-3 rounded-xl"
onChange={handleChange}
/>



<input
name="area"
type="number"
placeholder="Area sq ft"
className="w-full border p-3 rounded-xl"
onChange={handleChange}
/>



<select
name="propertyType"
className="w-full border p-3 rounded-xl"
onChange={handleChange}
>


<option>
Apartment
</option>

<option>
Villa
</option>

<option>
Plot
</option>

<option>
Commercial
</option>


</select>




<button
className="w-full bg-blue-600 text-white p-3 rounded-xl"
>

Create Property

</button>


</form>


</div>


</div>

);


}