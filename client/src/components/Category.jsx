import React, { useContext } from "react";
import { categories } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Category = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className="mt-16">
      <p className="text-2xl font-medium md:text-3xl">Categories</p>
      <div
        className=" my-6 grid grid-cols-2
       sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 items-center justify-center"
      >
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scroll(0, 0);
            }}
          >
            <img src={category.image} alt="" className="w-16 h-16"></img>
            <p className="text-sm  font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
