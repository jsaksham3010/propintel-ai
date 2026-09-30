"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import Link from "next/link";

import {
  ArrowLeft,
  Trash2,
  ShieldCheck,
} from "lucide-react";


import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";

import DeleteModal from "@/components/common/DeleteModal";


import PropertyInfo from "@/components/property/PropertyInfo";
import ImageGallery from "@/components/property/ImageGallery";
import UploadImages from "@/components/property/UploadImages";
import AIAnalysis from "@/components/property/AIAnalysis";
import AIReport from "@/components/property/AIReport";


import {
  getPropertyById,
  getAIReport,
  deleteProperty,
} from "@/services/propertyDetailService";





export default function PropertyDetailPage(){


const params = useParams();

const router = useRouter();


const id = params.id as string;



const [property,setProperty] =
useState<any>(null);


const [aiReport,setAiReport] =
useState<any>(null);


const [user,setUser] =
useState<any>(null);


const [loading,setLoading] =
useState(true);


const [error,setError] =
useState("");


const [deleteOpen,setDeleteOpen] =
useState(false);


const [deleting,setDeleting] =
useState(false);








useEffect(()=>{


const storedUser =
localStorage.getItem("user");


if(storedUser){

setUser(
JSON.parse(storedUser)
);

}


},[]);









const fetchProperty = useCallback(

async()=>{


try{


setLoading(true);

setError("");



const [
propertyResponse,
reportResponse
]

=
await Promise.allSettled([

getPropertyById(id),

getAIReport(id),

]);







if(

propertyResponse.status==="fulfilled" &&

propertyResponse.value?.property

){


setProperty(

propertyResponse.value.property

);


}

else{


setError(
"Property not found"
);


}






if(

reportResponse.status==="fulfilled"

){


setAiReport(

reportResponse.value.report

);


}

else{


setAiReport(null);


}



}

catch(error){


console.error(

"Property Detail Error:",

error

);


setError(

"Something went wrong."

);


}

finally{


setLoading(false);


}



},[id]);








useEffect(()=>{


if(id){

fetchProperty();

}


},[id,fetchProperty]);









const handleDelete = async()=>{


try{


setDeleting(true);



await deleteProperty(id);



router.push("/properties");



}

catch(error){


console.error(

"Delete Error",

error

);


alert(

"Failed to delete property"

);


}

finally{


setDeleting(false);


}



};







const canManage =

user?.role==="builder"

||

user?.role==="buyer";










if(loading){


return (

<div className="flex min-h-screen items-center justify-center">

<h2 className="text-xl font-semibold text-gray-500">

Loading Property...

</h2>

</div>

);

}








if(error || !property){


return (

<div className="flex min-h-screen flex-col items-center justify-center gap-4">


<h2 className="text-xl font-semibold text-red-500">

{error || "Property not found"}

</h2>



<button

onClick={fetchProperty}

className="rounded-xl bg-blue-600 px-5 py-2 text-white"

>

Retry

</button>


</div>

);


}








return (

<AuthGuard>


<DashboardLayout>


<div className="min-h-screen bg-gray-50 p-8">


<div className="mx-auto max-w-6xl space-y-8">







<div className="flex items-center justify-between">


<Link

href="/properties"

className="flex items-center gap-2 text-blue-600 font-medium"

>

<ArrowLeft size={18}/>

Back to Properties

</Link>








{

user?.role==="admin" && (

<div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-blue-600">


<ShieldCheck size={18}/>

Admin View

</div>

)

}








{

canManage && (

<button

onClick={()=>setDeleteOpen(true)}

className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600"

>


<Trash2 size={18}/>

Delete Property


</button>

)

}



</div>









<div className="rounded-3xl border bg-white p-8 shadow-sm">


<PropertyInfo

property={property}

/>


</div>








<ImageGallery

images={property.images || []}

/>









{

canManage && (

<UploadImages

propertyId={id}

onUploadSuccess={fetchProperty}

/>

)

}









{

canManage && (

<AIAnalysis

propertyId={id}

onAnalysisComplete={fetchProperty}

/>

)

}









<AIReport

report={aiReport}

property={property}

/>








</div>


</div>









{

canManage && (

<DeleteModal

open={deleteOpen}

onClose={()=>setDeleteOpen(false)}

onConfirm={handleDelete}

loading={deleting}

/>

)

}



</DashboardLayout>


</AuthGuard>

);


}