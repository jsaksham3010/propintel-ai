"use client";

import {
  useState,
} from "react";

import {
  X,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";



interface Image {

  url:string;

  public_id?:string;

}



interface ImageGalleryProps {

  images:Image[];

}





export default function ImageGallery({

  images,

}:ImageGalleryProps){



const [selected,setSelected] =
useState<number | null>(null);







if(!images || images.length===0){


return(

<div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">


<div className="flex items-center gap-3 mb-5">

<Images
className="text-blue-600"
/>

<h2 className="text-2xl font-bold">

Property Images

</h2>

</div>



<div className="rounded-2xl border-2 border-dashed p-12 text-center">

<p className="text-gray-500">

No images uploaded yet.

</p>

</div>


</div>

);


}







const nextImage = ()=>{


if(selected===null)
return;


setSelected(

(selected + 1) % images.length

);


};






const previousImage = ()=>{


if(selected===null)
return;


setSelected(

selected === 0

?

images.length - 1

:

selected - 1

);


};







return(

<>


<div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">


<div className="flex items-center gap-3 mb-6">


<Images

className="text-blue-600"

/>


<h2 className="text-2xl font-bold">

Property Images

</h2>


</div>








<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">


{
images.map(
(image,index)=>(


<div

key={image.public_id || index}

onClick={()=>setSelected(index)}

className="cursor-pointer overflow-hidden rounded-2xl border bg-gray-100"

>


<img

src={image.url}

alt={`Property ${index+1}`}

className="h-64 w-full object-cover transition duration-300 hover:scale-105"

/>


</div>


)

)

}



</div>




</div>










{
selected!==null &&


<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5">


<button

onClick={()=>setSelected(null)}

className="absolute right-6 top-6 rounded-full bg-white p-3"

>


<X size={24}/>


</button>






<button

onClick={previousImage}

className="absolute left-6 rounded-full bg-white p-3"

>


<ChevronLeft size={28}/>


</button>







<img

src={images[selected].url}

alt="Preview"

className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"

/>








<button

onClick={nextImage}

className="absolute right-6 rounded-full bg-white p-3"

>


<ChevronRight size={28}/>


</button>




</div>


}



</>

);


}