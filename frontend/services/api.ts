import axios from "axios";



const api = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_URL,

  timeout: 1200000,

  headers: {

    "Content-Type": "application/json",

  },

});





// ==============================
// Request Interceptor
// Attach JWT Token
// ==============================

api.interceptors.request.use(

  (config)=>{


    if(typeof window !== "undefined"){


      const token = localStorage.getItem(
        "token"
      );


      if(token){


        config.headers.Authorization =
          `Bearer ${token}`;


      }


    }



    console.log(

      "🔥 API REQUEST:",

      config.method?.toUpperCase(),

      config.url

    );



    return config;


  },


  (error)=>{


    return Promise.reject(error);


  }


);







// ==============================
// Response Interceptor
// ==============================

api.interceptors.response.use(


(response)=>{


  return response;


},



(error)=>{


  console.log(

    "🔥 API ERROR:",

    error.response?.status,

    error.response?.data || error.message

  );



  // Token expired / invalid

  if(

    error.response?.status === 401 &&

    typeof window !== "undefined"

  ){


    localStorage.removeItem(
      "token"
    );


    localStorage.removeItem(
      "user"
    );


    // Do not redirect automatically
    // pages can handle it safely


  }



  return Promise.reject(error);


}


);






export default api;