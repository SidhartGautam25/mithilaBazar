import React, { useState, useEffect } from "react";

const Right: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      content: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl font-bold p-4 text-center">
          Summer Sale <br /> Up to 30% Off
        </div>
      ),
    },
    {
      content: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl font-bold p-4 text-center">
          Summer Sale <br /> Up to 30% Off
        </div>
      ),
    },
    {
      content: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl font-bold p-4 text-center">
          Summer Sale <br /> Up to 30% Off
        </div>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full md:w-3/4 lg:w-4/5 relative h-[400px] md:h-[450px] pl-4">
      {" "}
      {/* Added left padding */}
      <div className="w-full h-full relative overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.content}
          </div>
        ))}

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-red-500" : "bg-white bg-opacity-70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Right;
