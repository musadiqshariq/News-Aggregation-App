import React from "react";
import { Header } from "../generalComponents";
import { useWindowDimensions } from "../helpers";

export const Layout = ({ children }) => {
  const dimensions = useWindowDimensions();
  return (
    <div className="bg-slate-50" style={{ minHeight: dimensions.height - 1 }}>
      <Header />
      <div className="p-4 max-w-[1600px] mx-auto">{children}</div>
    </div>
  );
};
