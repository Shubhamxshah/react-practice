'use client'

import { useState } from "react";

export function LimitedTextInput({ characterLimit = 20 }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {setInputValue(e.target.value)};

  const handleSubmit = (e) => {
    e.preventDefault();

    // if input length is too long
    // alert "The input exceeds the character limit. Please shorten your text."
    // else
    // alert "Thanks for your submission"
    
    if (inputValue.length > characterLimit) {
      alert("The input exceeds the character limit. Please shorten your text.")
    } else {
      alert("Thanks for your submission")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="limited-text-input">Limited Text Input:</label>
        <span className="no-error">Characters remaining: {characterLimit - inputValue.length}</span>
      </div>
      <input
        type="text"
        placeholder="Enter some text"
        id="limited-text-input"
        value={inputValue}
        onChange={handleChange}
      />

      <button type="submit" className="primary">
        Submit
      </button>
    </form>
  );
}
