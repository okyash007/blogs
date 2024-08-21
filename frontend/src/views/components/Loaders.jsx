import React from "react";
import { zoomies, ring } from "ldrs";

zoomies.register();
ring.register();

export const LoaderZoomie = ({ size, color }) => {
  return (
    <l-zoomies
      size={size}
      stroke="5"
      bg-opacity="0.1"
      speed="0.8"
      color={color ? color : "white"}
    ></l-zoomies>
  );
};

export const CirCleLoader = ({ size, stroke, color }) => {
  return (
    <l-ring
      size={size}
      stroke={stroke}
      bg-opacity="0"
      speed="2"
      color={color}
    ></l-ring>
  );
};
