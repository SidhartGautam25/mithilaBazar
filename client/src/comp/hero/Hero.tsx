import React from "react";
import Left from "./Left";
import Right from "./Right";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row w-full max-w-7xl mx-auto my-8 bg-white">
      <Left />
      <div className="border-l border-gray-200"></div> {/* Thin gray border */}
      <Right />
    </section>
  );
};

export default Hero;
