"use client";

import {
  Trash2,
  X,
} from "lucide-react";


interface DeleteModalProps {

  open:boolean;

  onClose:()=>void;

  onConfirm:()=>void;

  loading?:boolean;

}




export default function DeleteModal({

  open,

  onClose,

  onConfirm,

  loading=false,

}:DeleteModalProps){


if(!open)
return null;




return (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">


<div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">


<div className="flex items-center justify-between">


<div className="flex items-center gap-3">


<div className="rounded-xl bg-red-100 p-3">


<Trash2

className="text-red-600"

/>


</div>



<h2 className="text-xl font-bold">

Delete Property

</h2>



</div>





<button

onClick={onClose}

className="rounded-full p-2 hover:bg-gray-100"

>


<X size={20}/>


</button>



</div>






<p className="mt-5 text-gray-500">

Are you sure you want to delete this property?
This action cannot be undone.

</p>






<div className="mt-8 flex justify-end gap-3">


<button

onClick={onClose}

className="rounded-xl border px-5 py-3 font-medium"

>

Cancel

</button>





<button

onClick={onConfirm}

disabled={loading}

className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"

>


{
loading
?
"Deleting..."
:
"Delete"
}


</button>



</div>



</div>


</div>

);


}