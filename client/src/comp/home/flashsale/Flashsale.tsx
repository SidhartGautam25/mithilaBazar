import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProductCard from "./Card";

interface Product {
  id: number;
  name: string;
  image: string;
  discount: number;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Baby care product",
    image: "/baby.png",
    discount: 40,
    price: 120,
    originalPrice: 160,
    rating: 4.5,
    reviews: 88,
  },
  {
    id: 2,
    name: "Dairy Product",
    image: "/dairy.png",
    discount: 35,
    price: 960,
    originalPrice: 1160,
    rating: 4.3,
    reviews: 75,
  },
  {
    id: 3,
    name: "Vadilal ice-cream",
    image: "/icecream.png",
    discount: 30,
    price: 370,
    originalPrice: 470,
    rating: 4.4,
    reviews: 99,
  },
  {
    id: 4,
    name: "Fruits & vegetable",
    image: "/fruits.png",
    discount: 25,
    price: 375,
    originalPrice: 400,
    rating: 4.6,
    reviews: 99,
  },
  {
    id: 5,
    name: "Organic Vegetables",
    image: "/vegetables.png",
    discount: 20,
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviews: 120,
  },
  {
    id: 6,
    name: "Organic Vegetables",
    image: "/vegetables.png",
    discount: 20,
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviews: 120,
  },
  {
    id: 7,
    name: "Organic Vegetables",
    image: "/vegetables.png",
    discount: 20,
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviews: 120,
  },
];

const FlashSale: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-gray-100 px-0 py-4 min-h-[70vh] max-h-[80vh] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center mb-3 px-4 flex-shrink-0">
        <span className="w-2 h-7 bg-red-500 mr-2 rounded-sm"></span>
        <h2 className="text-titleSize mt-1 mb-1">Flash Sales</h2>
      </div>

      {/* Products Container - takes remaining space */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {/* Products Carousel - now properly filling height */}
        <div
          ref={scrollRef}
          className="absolute inset-0 flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth px-4 scrollbar-hide pb-4"
          style={{
            justifyContent: products.length < 4 ? "center" : "flex-start",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="h-full flex-shrink-0 mt-2"
              style={{ width: "calc(16.666% - 13.33px)" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Arrows */}
        {products.length > 4 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 shadow-md p-2 rounded-full z-10 hover:bg-white"
            >
              <FaArrowLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 shadow-md p-2 rounded-full z-10 hover:bg-white"
            >
              <FaArrowRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* View All Products Button */}
      <div className="flex justify-center flex-shrink-0 px-4 mt-2">
        <button className="bg-red-500 text-white px-8 py-2 text-sm rounded-md hover:bg-red-600 transition-colors duration-200">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default FlashSale;
