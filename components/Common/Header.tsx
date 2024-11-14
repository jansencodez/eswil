import React from "react";
import "@fortawesome/fontawesome-free";
import Sidebar from "./sideBar";
import Image from "next/image";
import image1 from "../../assets/icons/eswil-badge-adaptive.png";
import Link from "next/link";

function Header() {
  return (
    <div className="flex items-center justify-between bg-yellow-700 border-b-2 border-b-brown-500 p-4 sticky top-0 z-50 shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={image1}
            alt="logo"
            className="w-[70px] h-[70px] rounded-full border-2 border-white shadow-lg"
          />
        </Link>
      </div>

      {/* Sidebar Section */}
      <div className="w-36 flex">
        <Sidebar />
      </div>
    </div>
  );
}

export default Header;
