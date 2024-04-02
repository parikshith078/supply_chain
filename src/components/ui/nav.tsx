import MetaMask from "@/app/login/_component/metamask";
import React from "react";
import Image from "next/image";
// import yourImage from "../../../public/assets/images/images.jpeg";
const Nav = () => {
  return (
    <nav>
      <div className=" bg-slate-50 shadow-lg h-10vh flex justify-between z-50 text-gray-600 1g:py-5 px-20 py-4 flex-1">
        <ul className="flex gap-8 mr-16 text-[18px]">
            <li>LOGO</li>
          <li className="hover:text-black transition border-b-2 hover:border-slate-950 cursor-pointer">
            Home
          </li>
          <li className="hover:text-black transition border-b-2 hover:border-slate-950 cursor-pointer">
            Products
          </li>
          <li className="hover:text-black transition border-b-2 hover:border-slate-950 cursor-pointer">
            Cart
          </li>
          <li className="hover:text-black transition border-b-2 hover:border-slate-950 cursor-pointer">
            Profile
          </li>
          <li className="mt-2">
            <MetaMask />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
