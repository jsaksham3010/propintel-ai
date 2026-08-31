"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";

import { createProperty } from "@/services/propertyService";



export default function AddPropertyPage() {


  const router = useRouter();



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


      console.error(err);


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

Add New Property

</h1>


<p className="mt-2 text-gray-500">

Add property details for AI analysis.

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

/>






<input

name="city"

placeholder="City"

value={form.city}

onChange={handleChange}

className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"

/>






<input

name="state"

placeholder="State"

value={form.state}

onChange={handleChange}

className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"

/>






<div className="grid gap-5 md:grid-cols-2">


<input

name="price"

type="number"

placeholder="Price (₹)"

value={form.price}

onChange={handleChange}

className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"

/>





<input

name="area"

type="number"

placeholder="Area (sq ft)"

value={form.area}

onChange={handleChange}

className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"

/>


</div>







<select

name="propertyType"

value={form.propertyType}

onChange={handleChange}

className="w-full rounded-xl border p-3"

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

disabled={loading}

className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"

>


{
loading

?

"Creating Property..."

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