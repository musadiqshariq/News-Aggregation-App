import React from "react";

const NewsCardSkeleton = () => {
  return (
    <div className="w-full h-[350px] rounded border-2 p-2 relative animate-pulse">
      <div className="w-full h-[150px] bg-gray-300 rounded"></div>
      <div className="mt-4">
        <div className="w-full h-10 bg-gray-300 rounded mb-4"></div>
        <div className="w-full h-14 bg-gray-300 rounded"></div>
      </div>
      <div className="text-xs text-gray-500 flex gap-2 mt-[35px]">
        <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
        <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
