"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Building2,
  FileText,
  User,
  LogOut,
  Sparkles,
} from "lucide-react";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const pathname = usePathname();
  const router = useRouter();


  const [user, setUser] = useState<any>(null);



  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);




  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    router.push("/login");

  };




  const menu = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Properties",
      href: "/properties",
      icon: Building2,
    },
    {
      name: "AI Reports",
      href: "/reports",
      icon: FileText,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];



  return (

    <div className="min-h-screen bg-white text-black flex">


      {/* Sidebar */}

      <aside className="w-72 border-r border-gray-200 bg-white p-6 shadow-sm flex flex-col">


        {/* Logo */}

        <div className="flex items-center gap-3 mb-10">

          <div className="bg-blue-600 p-2 rounded-xl shadow-md">

            <Sparkles
              size={24}
              className="text-white"
            />

          </div>


          <div>

            <h1 className="text-xl font-bold">

              PropIntel
              <span className="text-blue-600">
                AI
              </span>

            </h1>


            <p className="text-xs text-gray-500">
              Smart Property Analysis
            </p>

          </div>

        </div>




        {/* Navigation */}

        <nav className="space-y-2 flex-1">

          {menu.map((item)=>{

            const Icon = item.icon;

            const active = pathname === item.href;


            return (

              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >

                <Icon size={20}/>

                {item.name}

              </Link>

            );

          })}

        </nav>




        {/* User Profile */}

        <div className="border-t pt-5 mt-5">


          <p className="font-semibold text-gray-900">

            {user?.fullName || "User"}

          </p>


          <p className="text-sm text-gray-500 truncate">

            {user?.email || ""}

          </p>



          <button

            onClick={handleLogout}

            className="mt-4 flex items-center gap-3 text-red-500 px-4 py-3 rounded-xl w-full hover:bg-red-50 transition"

          >

            <LogOut size={20}/>

            Logout

          </button>


        </div>


      </aside>





      {/* Main */}

      <main className="flex-1">


        <header className="border-b border-gray-200 bg-white px-8 py-5">


          <h2 className="text-2xl font-semibold">

            PropIntel Dashboard

          </h2>


          <p className="text-sm text-gray-500 mt-1">

            AI powered property intelligence platform

          </p>


        </header>




        <section className="p-8 bg-gray-50 min-h-screen">

          {children}

        </section>


      </main>


    </div>

  );

}