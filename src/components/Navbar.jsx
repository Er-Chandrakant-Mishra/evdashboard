import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";

function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full p-4 text-white bg-primary md:w-auto">
      <div className="flex items-center">
      <AiOutlineDashboard className="text-white text-3xl sm:text-4xl" />
      <h1 className="ml-2 text-lg font-semibold sm:text-xl md:text-2xl">
         <Link to ="/"> EV Analytics Dashboard</Link>
        </h1>
      </div>
      {/* <div className="flex items-center">
        <Link to="/" className="mr-4 hover:text-gray-300">
          Home
        </Link>
        <Link to="/dashboard" className="mr-4 hover:text-gray-300">
          Dashboard
        </Link>
      </div> */}
    </nav>
  );
}

export default Navbar;
