import React from "react";
import { FcGoogle } from "react-icons/fc";

const SignupC: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-stretch">
        {/* Left Image Side (hidden on small screens) */}
        <div className="hidden md:block w-1/2 bg-blue-50">
          <img
            src="/signup-image.png" // Replace with your actual path
            alt="Signup visual"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
          <p className="text-sm text-gray-600 mb-6">Enter your details below</p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black"
            />
            <input
              type="text"
              placeholder="Email or Phone Number"
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black"
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Create Account
            </button>
          </form>

          {/* Google Sign Up */}
          <button className="w-full mt-4 border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FcGoogle size={20} />
            <span className="text-sm">Sign up with Google</span>
          </button>

          {/* Already have account */}
          <p className="text-sm text-center mt-4 text-gray-600">
            Already have account?{" "}
            <a href="/login" className="text-black underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupC;
