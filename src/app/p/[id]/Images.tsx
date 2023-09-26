"use client";
import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Images = ({ images }: any) => {
  let imageSliderRef: any = useRef<Slider | null>(null);

  return (
    <Slider
      {...settings}
      ref={imageSliderRef}
      className="w-full max-h-[350px] object-contain"
    >
      {images?.map((image: any, index: number) => (
        <Image
          key={index}
          src={image.secure_url}
          width={300}
          height={250}
          className="w-full max-h-[350px] object-contain"
          alt="Post"
        />
      ))}
    </Slider>
  );
};

export default Images;
