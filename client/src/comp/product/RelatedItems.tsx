import React from "react";
import ProductCard from "./ProductCard";

const relatedProducts = [
  {
    name: "Vadilal's nolengur",
    image: "/images/img1.png",
    discount: 40,
    price: 120,
    oldPrice: 160,
    rating: 4.5,
    reviews: 88,
  },
  {
    name: "Spiral notebook",
    image: "/images/img2.png",
    discount: 35,
    price: 960,
    oldPrice: 1160,
    rating: 4,
    reviews: 75,
  },
  {
    name: "Sapin Milk",
    image: "/images/img3.png",
    discount: 30,
    price: 370,
    oldPrice: 400,
    rating: 5,
    reviews: 99,
  },
  {
    name: "Vadilal cone chocolate",
    image: "/images/img4.png",
    discount: 20,
    price: 160,
    oldPrice: 170,
    rating: 4.3,
    reviews: 65,
  },
];

const RelatedItems: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-4 bg-red-500 rounded-sm" />
        <h2 className="text-lg font-semibold">Related Item</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {relatedProducts.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedItems;
