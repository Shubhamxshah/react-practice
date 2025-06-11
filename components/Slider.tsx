"use client";

import React, { useState } from "react";

const Items = [
  {
    name: "button 1",
    value: "you clicked 1",
  },
  {
    name: "button 2",
    value: "you clicked 2",
  },
  {
    name: "button 3",
    value: "you clicked 3",
  },
];
const Slider = () => {
  const [key, setKey] = useState(0);

  const handleClick = (index: number) => {
    setKey(index);
  };

  return (
    <>
      <div className="flex">
        {Items.map((item, index) => {
          return (
            <span key={index} className="p-4 bg-blue-300 rounded-2xl cursor-pointer" onClick={() => handleClick(index)}>
              {item.name}
            </span>
          );
        })}
      </div>
      <div>{Items[key].value}</div>
    </>
  );
};

export default Slider;
