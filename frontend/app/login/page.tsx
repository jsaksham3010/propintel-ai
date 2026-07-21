"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Normal Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );


      const { token, user } = response.data;


      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      router.push("/dashboard");


    } catch (err: any) {

      setError(
        err.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };



  // Google Login
  const handleGoogleLogin = async (
    credentialResponse: any
  ) => {

    console.log(
      "GOOGLE RESPONSE:",
      credentialResponse
    );


    try {

      setError("");


      const response = await api.post(
        "/auth/google",
        {
          token: credentialResponse.credential,
        }
      );


      console.log(
        "BACKEND RESPONSE:",
        response.data
      );


      const {
        token,
        user
      } = response.data;


      localStorage.setItem(
        "token",
        token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      router.push("/dashboard");


    } catch (err: any) {

      console.log(
        "GOOGLE LOGIN ERROR:",
        err
      );


      setError(
        err.response?.data?.message ||
        "Google Login Failed"
      );

    }
  };



  return (

    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">


      <div className="w-full max-w-md rounded-3xl bg-white border border-gray-200 shadow-xl p-8">


        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>


          <p className="mt-2 text-gray-500">
            Login to your PropIntel AI account
          </p>

        </div>



        {error && (

          <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">

            {error}

          </div>

        )}



        {/* Google Login */}

        <div className="flex justify-center mb-5">

          <GoogleLogin

            onSuccess={handleGoogleLogin}

            onError={() =>
              setError(
                "Google Login Failed"
              )
            }

          />

        </div>



        <div className="flex items-center gap-3 my-5">

          <div className="h-px bg-gray-200 flex-1" />

          <span className="text-sm text-gray-400">
            OR
          </span>

          <div className="h-px bg-gray-200 flex-1" />

        </div>




        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >


          <div>

            <label className="text-sm text-gray-600">
              Email
            </label>


            <input

              type="email"

              value={email}

              onChange={(e)=>
                setEmail(e.target.value)
              }

              placeholder="saksham@example.com"

              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"

              required

            />

          </div>




          <div>

            <label className="text-sm text-gray-600">
              Password
            </label>


            <input

              type="password"

              value={password}

              onChange={(e)=>
                setPassword(e.target.value)
              }

              placeholder="••••••••"

              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"

              required

            />

          </div>





          <button

            disabled={loading}

            className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"

          >

            {loading && (

              <Loader2
                className="animate-spin"
                size={18}
              />

            )}

            Login

          </button>



        </form>





        <p className="mt-6 text-center text-sm text-gray-500">


          Don't have an account?{" "}


          <Link

            href="/register"

            className="text-blue-600 font-medium"

          >

            Register

          </Link>


        </p>



      </div>


    </div>

  );
}