import Link from "next/link";

import {
  Sparkles,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";



export default function Footer() {


  return (


    <footer
      id="contact"
      className="border-t bg-gray-50"
    >


      <div className="mx-auto max-w-7xl px-6 py-16">





        <div className="grid gap-10 md:grid-cols-4">






          {/* Brand */}


          <div className="md:col-span-2">


            <div className="flex items-center gap-3">


              <div className="rounded-xl bg-blue-600 p-3">

                <Sparkles
                  size={22}
                  className="text-white"
                />

              </div>





              <h2 className="text-2xl font-bold">

                Prop
                <span className="text-blue-600">
                  Intel
                </span>

                <span className="ml-1">
                  AI
                </span>

              </h2>


            </div>






            <p className="mt-5 max-w-md leading-relaxed text-gray-500">


              AI-powered real estate intelligence platform helping buyers and investors make smarter property decisions with confidence.


            </p>








            <div className="mt-6 space-y-3 text-sm text-gray-500">


              <div className="flex items-center gap-2">

                <Mail size={16}/>

                propintelai2026@gmail.com

              </div>





              <div className="flex items-center gap-2">

                <MapPin size={16}/>

                India

              </div>


            </div>



          </div>









          {/* Product */}


          <div>


            <h3 className="font-bold">

              Product

            </h3>





            <ul className="mt-5 space-y-3 text-gray-500">



              <li>

                <a
                  href="#features"
                  className="hover:text-blue-600"
                >

                  AI Features

                </a>

              </li>





              <li>

                <a
                  href="#how-it-works"
                  className="hover:text-blue-600"
                >

                  How It Works

                </a>

              </li>





              <li>

                <a
                  href="#why-us"
                  className="hover:text-blue-600"
                >

                  Why PropIntel

                </a>

              </li>





              <li>

                <a
                  href="#founder"
                  className="hover:text-blue-600"
                >

                  Meet Founder

                </a>

              </li>





              <li>

                <a
                  href="#vision"
                  className="hover:text-blue-600"
                >

                  Our Vision

                </a>

              </li>





              <li>

                <a
                  href="#faq"
                  className="hover:text-blue-600"
                >

                  FAQ

                </a>

              </li>



            </ul>


          </div>









          {/* Company */}


          <div>


            <h3 className="font-bold">

              Company

            </h3>





            <ul className="mt-5 space-y-3 text-gray-500">





              <li>

                <Link
                  href="/login"
                  className="hover:text-blue-600"
                >

                  Login

                </Link>

              </li>







              <li>

                <Link
                  href="/register"
                  className="hover:text-blue-600"
                >

                  Create Account

                </Link>

              </li>







              <li>

                <a
                  href="mailto:propintelai2026@gmail.com"
                  className="flex items-center gap-2 hover:text-blue-600"
                >

                  Contact

                  <ArrowRight size={15}/>

                </a>

              </li>





            </ul>



          </div>






        </div>









        <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">


          © {new Date().getFullYear()} PropIntel AI. All rights reserved.


        </div>






      </div>


    </footer>


  );


}