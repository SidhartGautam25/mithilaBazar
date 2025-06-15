import React, { useRef } from "react";
import {
  MdPhoneIphone,
  MdComputer,
  MdWatch,
  MdCameraAlt,
  MdHeadset,
  MdGames,
} from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface CategoryItem {
  label: string;
  icon: React.ReactNode;
}

const categories: CategoryItem[] = [
  {
    label: "Phones",
    icon: <MdPhoneIphone className="text-gray-700" size={24} />,
  },
  {
    label: "Computers",
    icon: <MdComputer className="text-gray-700" size={24} />,
  },
  {
    label: "SmartWatch",
    icon: <MdWatch className="text-gray-700" size={24} />,
  },
  {
    label: "Camera",
    icon: <MdCameraAlt className="text-gray-700" size={24} />,
  },
  {
    label: "Headphones",
    icon: <MdHeadset className="text-gray-700" size={24} />,
  },
  { label: "Gaming", icon: <MdGames className="text-gray-700" size={24} /> },
  {
    label: "Laptops",
    icon: <MdComputer className="text-gray-700" size={24} />,
  },
  {
    label: "Speakers",
    icon: <MdHeadset className="text-gray-700" size={24} />,
  },
  {
    label: "Tablets",
    icon: <MdComputer className="text-gray-700" size={24} />,
  },
  {
    label: "Accessories",
    icon: <MdHeadset className="text-gray-700" size={24} />,
  },
];

const CategorySection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const itemWidth = 140; // Approximate width of each item including gap
      const scrollAmount =
        direction === "left" ? -itemWidth * 3 : itemWidth * 3;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full px-8 md:px-16 lg:px-24 py-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Browse By Category
          </h2>
          <div className="w-12 h-1 bg-blue-500 mt-2 rounded-full"></div>
        </div>

        {/* Scrollable Items with Overlaid Arrows */}
        <div className="relative">
          {/* Left Arrow - Positioned absolutely */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 shadow-lg text-gray-600 rounded-full transition-all duration-200 border border-gray-200 z-10"
            aria-label="Scroll left"
          >
            <FaArrowLeft size={16} />
          </button>

          {/* Right Arrow - Positioned absolutely */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 shadow-lg text-gray-600 rounded-full transition-all duration-200 border border-gray-200 z-10"
            aria-label="Scroll right"
          >
            <FaArrowRight size={16} />
          </button>

          {/* Categories Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-32 bg-gray-50 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center border border-gray-200 transition-all duration-200 cursor-pointer"
              >
                <div className="mb-3 p-3 bg-white rounded-full shadow-sm flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center px-2">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
