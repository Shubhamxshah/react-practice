import React from "react";

type Props = {
  name: string;
  img: string;
  handle: string;
};

const Badge = ({name, handle, img}: Props) => {

  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                flex flex-col justify-center w-1/4 items-center border border-amber-50 bg-blue-200"
    >
      <img alt="profile" src={img} className="border rounded-full" />
      <div className="flex p-2 text-black flex-col items-center">
        <h4>{name}</h4>
        <p>{handle}</p>
      </div>
    </div>
  );
};

export default Badge;
