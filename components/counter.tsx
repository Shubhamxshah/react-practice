"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(1);
    setCount((c) => c + 3);
    setCount(7);
    setCount((c) => c + 10);
  };

  return (
    <main>
      <h1>{count}</h1>
      <button onClick={handleClick}>+</button>
    </main>
  );
}
