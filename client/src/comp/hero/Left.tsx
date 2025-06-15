import React from "react";
import { FaChevronRight } from "react-icons/fa";

const categories = [
  "Fruits",
  "Vegetables",
  "Dairy",
  "Meat",
  "Medicine",
  "Dairy",
  "Kitchen's need",
  "Groceries & Pets",
  "Health & Beauty",
];

const Left: React.FC = () => {
  return (
    <div className="w-full md:w-1/4 lg:w-1/5 border-r border-gray-200 pl-4 pr-6 py-6">
      {" "}
      {/* Adjusted padding and width */}
      <h3 className="text-lg font-semibold mb-5 text-gray-900">Categories</h3>
      <ul className="space-y-4 text-base text-gray-700">
        {categories.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center cursor-pointer hover:text-black hover:font-medium transition-all"
          >
            <span className="flex-1">{item}</span>
            <FaChevronRight className="text-sm ml-2" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Left;
