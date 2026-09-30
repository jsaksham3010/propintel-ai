"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";


interface AuthGuardProps {

  children: React.ReactNode;

  allowedRoles?: (
    "admin" |
    "builder" |
    "buyer"
  )[];

}



export default function AuthGuard({

  children,

  allowedRoles,

}: AuthGuardProps) {


const router = useRouter();


const [loading,setLoading] = useState(true);





useEffect(()=>{


const checkAuth = async()=>{


try{


const token = localStorage.getItem(
"token"
);



console.log(
"AUTH TOKEN:",
token
);




if(!token){

router.replace("/login");

return;

}





const response = await api.get(

"/auth/me"

);





console.log(

"AUTH RESPONSE:",

response.data

);






if(!response.data?.success){

throw new Error(
"Authentication failed"
);

}






const user = response.data.user;






// Role protection

if(

allowedRoles &&

!allowedRoles.includes(
user.role
)

){



if(user.role==="admin"){

router.replace(
"/admin/dashboard"
);

}

else if(user.role==="builder"){

router.replace(
"/builder/dashboard"
);

}

else{

router.replace(
"/dashboard"
);

}



return;

}





setLoading(false);



}

catch(error:any){



console.error(

"AUTH ERROR:",

error.response?.data || error.message

);



localStorage.removeItem(
"token"
);


localStorage.removeItem(
"user"
);



router.replace(
"/login"
);



}



};





checkAuth();



},[router,allowedRoles]);








if(loading){


return (

<div className="min-h-screen flex items-center justify-center bg-gray-50">


<div className="flex flex-col items-center gap-4">


<div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"/>


<p className="text-gray-600">

Verifying your session...

</p>


</div>


</div>

);


}





return <>{children}</>;



}