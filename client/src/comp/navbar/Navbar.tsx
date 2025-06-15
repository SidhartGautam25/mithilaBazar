import React from "react";
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <header className="w-full px-4 md:px-10 py-4 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <div className="text-xl font-bold">Grocery</div>

      {/* Nav links */}
      <nav className="hidden md:flex space-x-6 text-sm text-gray-800">
        <a href="/" className="hover:text-black">
          Home
        </a>
        <a href="#" className="hover:text-black">
          Contact
        </a>
        <a href="#" className="hover:text-black">
          About
        </a>
        <a href="/signup" className="hover:text-black">
          Sign Up
        </a>
      </nav>

      {/* Right-side: search + icons - Adjusted spacing and icon sizes */}
      <div className="flex items-center space-x-6 ml-8">
        {" "}
        {/* Increased space-x and added ml-8 */}
        {/* Search bar - moved left */}
        <div className="relative hidden md:block mr-4">
          {" "}
          {/* Added mr-4 */}
          <input
            type="text"
            placeholder="What are you looking for?"
            className="pl-4 pr-8 py-1 text-sm bg-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
        </div>
        {/* Icons - larger size */}
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <FaHeart className="text-xl text-gray-700" />{" "}
          {/* text-xl instead of text-lg */}
        </button>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <FaShoppingCart className="text-xl text-gray-700" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <FaUser className="text-xl text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
