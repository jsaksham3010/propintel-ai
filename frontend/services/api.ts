import axios from "axios";


const api = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_URL,

  timeout: 120000,

  headers: {
    "Content-Type": "application/json",
  },

});



// Attach JWT Token
api.interceptors.request.use(

  (config) => {


    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;


    console.log(
      "🔥 API REQUEST:",
      config.url
    );


    console.log(
      "🔥 API TOKEN:",
      token
    );


    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

  },


  (error) => {

    return Promise.reject(error);

  }

);



// Response Handler
api.interceptors.response.use(

  (response) => {

    return response;

  },


  (error) => {


    console.log(
      "🔥 API ERROR:",
      error.response?.status,
      error.response?.data
    );


    return Promise.reject(error);

  }

);



export default api;