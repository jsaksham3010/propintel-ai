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
  Pencil,
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


const [loading,setLoading] =
useState(true);


const [error,setError] =
useState("");



const [deleteOpen,setDeleteOpen] =
useState(false);


const [deleting,setDeleting] =
useState(false);








const fetchProperty = useCallback(
async()=>{


try{


setLoading(true);

setError("");



const [
propertyResult,
reportResult
]
=
await Promise.allSettled([


getPropertyById(id),


getAIReport(id),


]);





if(
propertyResult.status==="fulfilled" &&
propertyResult.value?.property
){


setProperty(
propertyResult.value.property
);


}
else{


setError(
"Property not found."
);


}







if(
reportResult.status==="fulfilled"
){


setAiReport(
reportResult.value.report
);


}
else{


setAiReport(null);


}




}
catch(err){


console.error(err);


setError(
"Something went wrong."
);


}

finally{


setLoading(false);


}



},
[id]);









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
catch(err){


console.error(
"Delete Error",
err
);


alert(
"Failed to delete property"
);


}
finally{


setDeleting(false);


}



};









if(loading){


return(

<div className="flex min-h-screen items-center justify-center">


<h2 className="text-xl font-semibold text-gray-500">

Loading Property...

</h2>


</div>

);


}









if(error || !property){


return(

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









return(

<AuthGuard>

<DashboardLayout>


<div className="min-h-screen bg-gray-50 p-8">


<div className="mx-auto max-w-6xl space-y-8">






{/* Actions */}


<div className="flex items-center justify-between">


<Link

href="/properties"

className="flex items-center gap-2 font-medium text-blue-600"

>

<ArrowLeft size={18}/>

Back to Properties

</Link>





<div className="flex gap-3">





<Link

href={`/properties/edit/${id}`}

className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"

>

<Pencil size={18}/>

Edit Property

</Link>







<button

onClick={()=>setDeleteOpen(true)}

className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-600"

>


<Trash2 size={18}/>

Delete Property


</button>




</div>



</div>









<div className="rounded-3xl border bg-white p-8 shadow-sm">


<PropertyInfo

property={property}

/>


</div>









<ImageGallery

images={property.images || []}

/>









<UploadImages

propertyId={id}

onUploadSuccess={fetchProperty}

/>









<AIAnalysis

propertyId={id}

onAnalysisComplete={fetchProperty}

/>









<AIReport

report={aiReport}

property={property}

/>









</div>


</div>








<DeleteModal

open={deleteOpen}

onClose={()=>setDeleteOpen(false)}

onConfirm={handleDelete}

loading={deleting}

/>





</DashboardLayout>


</AuthGuard>

);


}