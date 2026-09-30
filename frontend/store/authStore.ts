import { create } from "zustand";


export type UserRole =
  | "admin"
  | "builder"
  | "buyer";



export interface User {

  id: string;

  fullName: string;

  email: string;

  role: UserRole;

}



interface AuthState {

  user: User | null;

  token: string | null;


  setAuth: (

    token: string,

    user: User

  ) => void;


  logout: () => void;


}






export const useAuthStore = create<AuthState>((set) => ({


  user:
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem("user") || "null"
        )
      : null,



  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,





  setAuth: (

    token,

    user

  ) => {



    if(typeof window !== "undefined"){


      localStorage.setItem(

        "token",

        token

      );


      localStorage.setItem(

        "user",

        JSON.stringify(user)

      );


    }





    set({

      token,

      user,

    });



  },






  logout:()=>{


    if(typeof window !== "undefined"){


      localStorage.removeItem(

        "token"

      );


      localStorage.removeItem(

        "user"

      );


    }





    set({

      token:null,

      user:null,

    });



  },


}));