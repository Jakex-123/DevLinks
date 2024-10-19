'use client'; // Ensure this is a client component

import { useState } from "react";
import Image from "next/image";
import PreviewButton from "./PreviewButton";
import ProfileIcon from "/public/images/icon-profile-details-header.svg";
import LinkIcon from "/public/images/icon-link.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({isAuth}:{isAuth:boolean}) => {
  // State to track the active button
  const path=usePathname()
  const [activeTab, setActiveTab] = useState(path.slice(1));
  
  return (
    <div className="h-[74px] md:h-[78px] w-full flex justify-between items-center p-4 pl-6 rounded-xl bg-white">
      <div className="w-[52px] md:w-auto flex items-center gap-[6px]">
        <Image
          src={"/images/logo-devlinks-small.svg"}
          height={32}
          width={32}
          alt="logo"
        />
        <span className="hidden md:block text-heading font-bold text-[28px]">
          devlinks
        </span>
      </div>
      {!isAuth && 
      <div className="flex items-center">
        {/* Links button */}
        <Link href={'/links'}
          className={`px-[27px] py-[11px] items-center gap-2 flex rounded-lg 
          hover:text-accent navlink ${
            activeTab === "links" ? "bg-hover font-bold" : ""
          }`}
          onClick={() => setActiveTab("links")} // Set active tab
        >
          <div className="w-5 h-5">
            <LinkIcon />
          </div>
          <span className="hidden md:block font-semibold text-[16px]">
            Links
          </span>
        </Link>

        {/* Profile Details button */}
        <Link href={'/profile'}
          className={`px-[27px] py-[11px] items-center gap-2 flex rounded-lg 
          hover:text-accent navlink ${
            activeTab === "profile" ? "bg-hover font-bold" : ""
          }`}
          onClick={() => setActiveTab("profile")} // Set active tab
        >
          <div className="w-5 h-5">
            <ProfileIcon />
          </div>
          <span className="hidden md:block font-semibold text-[16px]">
            Profile Details
          </span>
        </Link>
      </div>}
      {!isAuth && <PreviewButton />}
    </div>
  );
};

export default Navbar;

