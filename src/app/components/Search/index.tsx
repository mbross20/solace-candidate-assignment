import React, { forwardRef } from "react";

export const Search = forwardRef<HTMLInputElement, { onClickReset: () => void; onClickSubmit: () => void }>(
  ({ onClickReset, onClickSubmit }, ref) => (
    <form>
      <h3>Search</h3>
      <div className="flex relative">
        <input ref={ref} name="search-input" type="text" aria-label="Search input" placeholder="Search for an advocate" className="border border-gray-300 p-2" />
        <button type="button" onClick={onClickReset} aria-label="Reset search" className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-900 px-2 py-2 absolute right-0 top-0">Reset Search</button>
        <button type="button" onClick={onClickSubmit} aria-label="Search submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-900 px-2 py-2 absolute right-0 top-0">Submit</button>
      </div>
    </form>
  )
);

Search.displayName = "Search";