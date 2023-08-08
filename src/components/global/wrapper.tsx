import Image from "next/image";
import Link from "next/link";
import React from "react";

import { motion } from "framer-motion";
import { useRouter } from "next/router";
import CreateAvatar from "@/lib/avatar";

export default function Wrapper({
  children,
  custom,
  pageTitle,
}: {
  children: React.ReactNode;
  custom?: string;
  pageTitle: string;
}) {
  const sideItems = [
    {
      name: "Dashboard",
      link: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="md:w-7 md:h-7 h-8 w-8 transition ease-in duration-200 md:group-hover:text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
          />
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="md:w-6 md:h-6 h-8 w-8 transition ease-in duration-200 md:group-hover:text-primary"
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="md:w-6 md:h-6 h-8 w-8 transition ease-in duration-200 md:group-hover:text-primary"
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
        className="fixed top-0 left-0 z-40 md:w-64 w-20 h-screen pt-4 transition-transform bg-primaryLight border-r border-gray-200 translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-primaryLight ">
          <ul className="space-y-6 font-medium">
            <li>
              <Link href="/" className="flex md:ml-2 md:mr-24">
                <Image
                  src="/logo.png"
                  className="object-contain lg:block hidden"
                  width={250}
                  height={50}
                  alt="Logo"
                />
                <Image
                  src="/favicon.ico"
                  className="object-contain block lg:hidden"
                  width={50}
                  height={50}
                  alt="Logo"
                />
              </Link>
            </li>
            {sideItems.map((item, i) => (
              <OneSidebar
                isActive={
                  item.link !== "/"
                    ? router.pathname.startsWith(item.link)
                    : router.pathname === item.link
                }
                key={i}
                {...item}
              />
            ))}
          </ul>
        </div>
      </aside>
      <section
        className={`p-4 relative ml-20 md:ml-[16rem] pt-24 md:w-[calc(100%_-_16rem)] h-full bg-[#f0ede6] overflow-hidden ${custom}`}
      >
        <div className="absolute top-8 sm:right-4 right-0 inset-x-0 flex md:justify-between w-auto sm:px-4 justify-end">
          <h1 className="text-gray-800 font-bold text-2xl md:block hidden">
            {pageTitle}
          </h1>
          <div className="flex gap-4 self-end">
            <div className="flex flex-col gap-0">
              <p className="text-xl font-semibold text-gray-800">
                Liplan Lekipising
              </p>
              <span className="text-gray-500 text-base font-medium">
                l.lekipising@irembo.com
              </span>
            </div>
            <CreateAvatar seed="Liplan Lekipising" />
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
        className={`flex items-center md:border-[1px] ease-in md:border-white/30 text-lg p-2 rounded-lg md:hover:bg-white md:hover:text-primary group md:hover:border-white/10 transition duration-200 ${
          isActive ? "md:bg-white/20 text-white" : "bg-transparent text-white"
        }`}
      >
        {icon}
        <span className="ml-3 md:block hidden">{name}</span>
      </Link>
    </motion.li>
  );
}
