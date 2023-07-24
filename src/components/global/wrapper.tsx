import Image from "next/image";
import Link from "next/link";
import React from "react";

import { motion } from "framer-motion";
import { useRouter } from "next/router";
import CreateAvatar from "@/lib/avatar";

export default function Wrapper({
  children,
  custom,
}: {
  children: React.ReactNode;
  custom?: string;
}) {
  const sideItems = [
    {
      name: "Dashboard",
      link: "/",
      icon: (
        <svg
          className="w-6 h-6 transition ease-in duration-200 group-hover:text-primary"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
    },
    {
      name: "Transactions",
      link: "/transactions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-6 h-6 transition ease-in duration-200 group-hover:text-primary"
        >
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8V6Z" />
        </svg>
      ),
    },
    {
      name: "Payment Accounts",
      link: "/payment-accounts",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-6 h-6 transition ease-in duration-200 group-hover:text-primary"
        >
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      ),
    },
  ];

  const router = useRouter();

  return (
    <main className="">
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-4 transition-transform -translate-x-full bg-primaryLight border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-primaryLight ">
          <ul className="space-y-6 font-medium">
            <li>
              <Link href="/" className="flex ml-2 md:mr-24">
                <Image
                  src="/logo.png"
                  className="object-contain"
                  width={250}
                  height={50}
                  alt="Logo"
                />
              </Link>
            </li>
            {sideItems.map((item, i) => (
              <OneSidebar
                isActive={router.pathname === item.link}
                key={i}
                {...item}
              />
            ))}
          </ul>
        </div>
      </aside>
      <section
        className={`p-4 relative sm:ml-[17rem] pt-24 w-[calc(100%_-_19rem)] h-full bg-[#f0ede6] ${custom}`}
      >
        <div className="absolute top-8 right-4 inset-x-0 flex justify-between w-auto px-4">
          <h1 className="text-gray-800 font-bold text-2xl">Hi, welcome! 👋</h1>
          <div className="flex gap-4">
            <div className="flex flex-col gap-0">
              <p className="text-xl font-semibold text-gray-800">Jane Doe</p>
              <span className="text-gray-500 text-base font-medium">
                jane.doe@hello.com
              </span>
            </div>
            <CreateAvatar seed="Jane Doe" />
          </div>
        </div>
        {children}
      </section>
    </main>
  );
}

function OneSidebar({
  name,
  link,
  icon,
  isActive,
}: {
  name: string;
  link: string;
  icon: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <motion.li
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    >
      <Link
        href={link}
        className={`flex items-center border-[1px] ease-in border-white/30 text-lg p-2 rounded-lg hover:bg-white hover:text-primary group hover:border-white/10 transition duration-200 ${
          isActive ? "bg-white/20 text-white" : "bg-transparent text-white"
        }`}
      >
        {icon}
        <span className="ml-3">{name}</span>
      </Link>
    </motion.li>
  );
}
