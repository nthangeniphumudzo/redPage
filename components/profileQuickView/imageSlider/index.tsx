"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div style={{ position: "relative" }}>
      <Image
        src={images[currentImageIndex]}
        alt="Slider"
        style={{
          width: "100%", // Adjust size as needed
          height: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {images.map((image, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              border: "1.5px solid red",
              backgroundColor: currentImageIndex === index ? "black" : "gray",
              margin: "0 5px",
              cursor: "pointer",
            }}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
