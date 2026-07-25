"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/services/api";
import { GoogleLogin } from "@react-oauth/google";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {

  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSendOTP = async () => {

    try {

      setLoading(true);
      setError("");

      await api.post("/auth/send-otp", {
        email,
      });


      setOtpSent(true);


    } catch (err:any) {

      setError(
        err.response?.data?.message ||
        "Failed to send OTP"
      );

    } finally {

      setLoading(false);

    }

  };



  const handleVerifyRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    try {

      setLoading(true);
      setError("");


      const response = await api.post(
        "/auth/verify-otp",
        {
          fullName,
          email,
          password,
          otp,
        }
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



    } catch(err:any) {

      setError(
        err.response?.data?.message ||
        "Verification failed"
      );


    } finally {

      setLoading(false);

    }

  };




  const handleGoogleRegister = async (
    credentialResponse:any
  ) => {

    try {

      const response = await api.post(
        "/auth/google",
        {
          token: credentialResponse.credential,
        }
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


    } catch {

      setError(
        "Google signup failed"
      );

    }

  };



  return (

    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border p-8">


        <h1 className="text-3xl font-bold text-center text-gray-900">
          Create Account
        </h1>


        <p className="text-center text-gray-500 mt-2 mb-6">
          Join PropIntel AI
        </p>



        {error && (

          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-xl text-sm">

            {error}

          </div>

        )}




        <div className="flex justify-center mb-5">

          <GoogleLogin
            onSuccess={handleGoogleRegister}
            onError={() =>
              setError(
                "Google signup failed"
              )
            }
          />

        </div>




        <div className="flex items-center gap-3 mb-5">

          <div className="h-px bg-gray-200 flex-1"/>

          <span className="text-sm text-gray-400">
            OR
          </span>

          <div className="h-px bg-gray-200 flex-1"/>

        </div>




        <form
          onSubmit={handleVerifyRegister}
          className="space-y-4"
        >


          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />



          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />



          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />



          {!otpSent && (

            <button
              type="button"
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
            >

              {
                loading &&
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              }

              Send OTP

            </button>

          )}



          {otpSent && (

            <>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
                required
              />



              <button
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
              >

                {
                  loading &&
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                }

                Verify & Create Account

              </button>

            </>

          )}


        </form>




        <p className="text-center text-sm text-gray-500 mt-6">

          Already have an account?{" "}

          <Link
            href="/login"
            className="text-blue-600 font-medium"
          >
            Login
          </Link>

        </p>



      </div>

    </div>

  );
}