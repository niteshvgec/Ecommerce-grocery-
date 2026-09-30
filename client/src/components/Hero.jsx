import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative">
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="hidden md:block w-full"
      ></img>

      <img
        src={assets.main_banner_bg_sm}
        alt=""
        className="md:hidden  w-full"
      ></img>
      <div
        className="absolute inset-0 flex flex-col items-center md:items-start
      justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24"
      >
        <h1
          className="text-3xl md:text-4xl font-bold text-center md:text-left max-w-72 md:max-w-80 leading-tight
lg:leading-15"
        >
          Freshness you can Trust , savings you will love!
        </h1>

        <div className="flex items-center mt-6 font-medium gap-6">
          <Link
            to={"/products"}
            className="flex group items-center gap-2 px-7 rounded text-ellipsis
            "
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
