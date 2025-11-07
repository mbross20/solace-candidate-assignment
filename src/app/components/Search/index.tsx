import React, { useState } from "react";

export const Search: React.FC<{
  onSubmit: (query: string) => void;
  onReset: () => void;
}> = ({ onSubmit, onReset }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputValue); // only submit current input value
  };

  const handleReset = () => {
    setInputValue(""); // clear local input
    onReset(); // notify parent
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full text-sm text-left mt-12 bg-white border border-solid border-gray-300 border-b-0 p-5"
    >
      <h3>Search Solace advocates</h3>
      <div className="relative inline-block w-2/3 mt-2">
        <input
          name="search-input"
          placeholder="Search"
          type="text"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm p-2 pr-8 w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <button
            type="button"
            className="absolute text-gray-400 hover:text-gray-600 top-0 bottom-0 right-0"
            onClick={handleReset}
            aria-label="Clear Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-8 w-8"
            >
              <path
                fillRule="evenodd"
                d="M5.22 5.22a.75.75 0 0 1 1.06 0L10 8.94l3.72-3.72a.75.75 0 1 1 1.06 1.06L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-3.72 3.72a.75.75 0 1 1-1.06-1.06L8.94 10 5.22 6.28a.75.75 0 0 1 0-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        className="bg-[#1d4339] text-white text-sm p-2 mt-2"
        aria-label="Search"
      >
        Search
      </button>
    </form>
  );
};
