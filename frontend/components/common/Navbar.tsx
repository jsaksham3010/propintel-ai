"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {

  return (

    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">


        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-2"
        >

          <div className="rounded-xl bg-blue-600 p-2">

            <Sparkles
              size={22}
              className="text-white"
            />

          </div>


          <div>

            <h1 className="text-2xl font-bold">

              Prop
              <span className="text-blue-600">
                Intel
              </span>

              <span className="ml-1 text-sm text-gray-500">
                AI
              </span>

            </h1>

          </div>


        </Link>






        {/* Navigation */}


        <nav className="hidden items-center gap-8 md:flex">


          <a
            href="#features"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            Features
          </a>



          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            How It Works
          </a>





          <a
            href="#why-us"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            Why Us
          </a>





          <a
            href="#founder"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            Founder
          </a>





          <a
            href="#vision"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            Vision
          </a>





          <a
            href="#faq"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            FAQ
          </a>





          <a
            href="#contact"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            Contact
          </a>



        </nav>








        {/* Buttons */}


        <div className="flex items-center gap-3">


          <Link

            href="/login"

            className="hidden rounded-xl px-5 py-2 text-sm font-semibold transition hover:bg-gray-100 md:block"

          >

            Login

          </Link>





          <Link

            href="/register"

            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"

          >

            Start Free

          </Link>



        </div>




      </div>


    </header>


  );

}