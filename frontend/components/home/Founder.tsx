import {
  Sparkles,
  Target,
  Rocket,
  Brain,
  ArrowRight,
} from "lucide-react";



export default function Founder() {


  return (


    <section
      id="founder"
      className="scroll-mt-24 bg-gray-50 py-24"
    >


      <div className="mx-auto max-w-7xl px-6">





        <div className="grid items-center gap-12 lg:grid-cols-2">






          {/* Founder Identity Card */}


          <div className="rounded-3xl border bg-white p-10 shadow-sm">


            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">

              SJ

            </div>





            <h2 className="mt-6 text-3xl font-bold text-gray-900">

              Saksham Jain

            </h2>





            <p className="mt-2 font-semibold text-blue-600">

              Founder, PropIntel AI

            </p>







            <div className="mt-8 space-y-6">






              <div className="flex gap-4">


                <div className="rounded-xl bg-blue-50 p-3">

                  <Brain
                    className="text-blue-600"
                  />

                </div>



                <div>


                  <h3 className="font-bold text-gray-900">

                    Technology Driven Vision

                  </h3>



                  <p className="mt-1 text-sm text-gray-500">

                    Building AI solutions that simplify complex real-world decisions.

                  </p>


                </div>


              </div>









              <div className="flex gap-4">


                <div className="rounded-xl bg-indigo-50 p-3">

                  <Target
                    className="text-indigo-600"
                  />

                </div>




                <div>


                  <h3 className="font-bold text-gray-900">

                    Problem Solving Approach

                  </h3>




                  <p className="mt-1 text-sm text-gray-500">

                    Creating practical technology products that solve everyday challenges.

                  </p>


                </div>


              </div>





            </div>



          </div>









          {/* Founder Story */}



          <div>




            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">


              <Sparkles size={16}/>


              Meet The Founder


            </span>








            <h1 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">


              Building The Future Of


              <br />


              Real Estate With AI


            </h1>









            <p className="mt-6 text-lg leading-relaxed text-gray-500">


              Saksham Jain is the founder of PropIntel AI, a platform built with the vision of transforming how people make real estate decisions.


            </p>








            <p className="mt-4 text-lg leading-relaxed text-gray-500">


              With a passion for technology, artificial intelligence and innovation, Saksham aims to bridge the gap between complex property analysis and simple, intelligent decision-making.


            </p>








            <p className="mt-4 text-lg leading-relaxed text-gray-500">


              Through PropIntel AI, the mission is to empower buyers and investors with AI-powered insights, risk analysis and smarter property intelligence before making one of their biggest financial decisions.


            </p>









            <div className="mt-8 rounded-2xl bg-blue-600 p-6 text-white">



              <div className="flex items-center gap-3">


                <Rocket/>


                <h3 className="text-xl font-bold">

                  The Vision

                </h3>


              </div>





              <p className="mt-3 text-blue-100">


                To create India's most trusted AI-powered real estate intelligence ecosystem.


              </p>



            </div>








            <button

              className="mt-8 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

            >


              Know More About Saksham


              <ArrowRight size={18}/>


            </button>







          </div>






        </div>






      </div>


    </section>


  );


}