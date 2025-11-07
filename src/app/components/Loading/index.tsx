import React from "react";

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600" />
      <p className="mt-3 text-sm font-medium text-gray-700">Loading</p>
    </div>
  );
};
