import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

const ProductInfo: React.FC = () => {
  const [qty, setQty] = useState(1);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="w-full md:w-1/2 px-4 py-6 space-y-4">
      <h1 className="text-xl font-semibold">
        Vadilal silk choclate icecream cup
      </h1>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>⭐⭐⭐⭐☆</span>
        <span>(150 Reviews)</span>
        <span className="text-green-600 ml-2">In Stock</span>
      </div>

      <div className="text-xl font-bold">$192.00</div>
      <p className="text-sm text-gray-600">
        Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
      </p>

      <hr />

      {/* Colours */}
      <div className="flex items-center gap-2">
        <span>Colours:</span>
        <button className="w-4 h-4 rounded-full bg-red-500 border" />
        <button className="w-4 h-4 rounded-full bg-blue-600 border" />
      </div>

      {/* Size */}
      <div className="flex items-center gap-2">
        <span>Size:</span>
        {sizes.map((size) => (
          <button
            key={size}
            className={`px-3 py-1 border rounded ${
              selectedSize === size
                ? "bg-black text-white"
                : "text-black border-gray-300"
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Quantity and Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="px-3 py-1 border"
        >
          −
        </button>
        <span>{qty}</span>
        <button onClick={() => setQty(qty + 1)} className="px-3 py-1 border">
          +
        </button>
        <button className="ml-4 bg-red-500 text-white px-5 py-2 rounded">
          Buy Now
        </button>
        <button className="ml-2 border p-2 rounded">
          <AiOutlineHeart size={20} />
        </button>
      </div>

      {/* Delivery Info */}
      <div className="border mt-4 divide-y">
        <div className="px-4 py-2 text-sm">
          <strong>Free Delivery</strong>
          <div className="text-gray-600 text-xs">
            Enter your postal code for Delivery Availability
          </div>
        </div>
        <div className="px-4 py-2 text-sm">
          <strong>Return Delivery</strong>
          <div className="text-gray-600 text-xs">
            Free 30 Days Delivery Returns. Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
