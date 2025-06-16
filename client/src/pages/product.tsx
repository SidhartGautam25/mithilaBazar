import React from "react";

const Product: React.FC = () => {

  // pushing this to main
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8">
        <ProductImages />
        <ProductInfo />
      </div>
      <RelatedItems />
      <Footer />
    </>
  );

};

export default Product;
