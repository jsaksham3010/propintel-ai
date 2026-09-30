"use client";

import {
  useState,
  useEffect,
} from "react";

import {
  Upload,
  ImagePlus,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";


import {
  uploadPropertyImages,
} from "@/services/propertyDetailService";



interface UploadImagesProps {

  propertyId:string;

  onUploadSuccess:()=>void;

}






export default function UploadImages({

propertyId,

onUploadSuccess,

}:UploadImagesProps){



const [files,setFiles] =

useState<File[]>([]);



const [loading,setLoading] =

useState(false);



const [success,setSuccess] =

useState("");



const [error,setError] =

useState("");








const handleFileChange = (

e:React.ChangeEvent<HTMLInputElement>

)=>{


if(!e.target.files)

return;



const selected =

Array.from(e.target.files);



if(selected.length > 10){


setError(

"Maximum 10 images allowed."

);


return;


}



setFiles(selected);

setError("");

setSuccess("");



};








const removeFile = (

index:number

)=>{


setFiles(

files.filter(

(_,i)=>i!==index

)

);


};









const handleUpload = async()=>{


if(files.length===0){

setError(
"Please select images first."
);

return;

}





try{


setLoading(true);

setError("");




await uploadPropertyImages(

propertyId,

files

);





setSuccess(

"Images uploaded successfully!"

);



setFiles([]);





onUploadSuccess();




}

catch(error:any){


console.error(

"Upload Error",

error

);



setError(

error.response?.data?.message ||

"Image upload failed."

);



}

finally{


setLoading(false);


}


};









return (

<div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">





<div className="mb-6 flex items-center gap-3">


<ImagePlus

className="text-blue-600"

size={28}

/>


<h2 className="text-2xl font-bold">

Upload Property Images

</h2>


</div>









<label

className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 transition hover:bg-gray-50"

>


<ImagePlus

size={45}

className="text-blue-600"

/>



<p className="mt-4 font-semibold">

Click to select images

</p>



<p className="mt-1 text-sm text-gray-500">

Maximum 10 images • JPG / PNG

</p>





<input

type="file"

multiple

accept="image/*"

className="hidden"

onChange={handleFileChange}

/>



</label>









{

files.length>0 && (

<div className="mt-6">


<p className="mb-4 font-medium text-gray-700">

{files.length} image(s) selected

</p>





<div className="grid gap-4 sm:grid-cols-3">


{

files.map(

(file,index)=>(


<div

key={index}

className="relative overflow-hidden rounded-2xl border"

>


<img

src={URL.createObjectURL(file)}

alt="preview"

className="h-32 w-full object-cover"

/>






<button

type="button"

onClick={()=>removeFile(index)}

className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"

>


<X size={16}/>


</button>




</div>


)


)


}



</div>







<button

onClick={handleUpload}

disabled={loading}

className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"

>


<Upload size={18}/>



{

loading

?

"Uploading..."

:

"Upload Images"

}



</button>



</div>

)

}









{

success && (

<div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-green-700">


<CheckCircle size={18}/>


{success}


</div>

)

}









{

error && (

<div className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-600">


<AlertCircle size={18}/>


{error}


</div>

)

}




</div>

);


}