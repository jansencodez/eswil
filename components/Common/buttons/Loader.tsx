import React from "react";

interface LoaderProps {
  size?: number; // Tailwind's numeric size scale (e.g., 6 for 'h-6 w-6')
  color?: string; // Tailwind color class (e.g., 'border-blue-500')
}

const Loader: React.FC<LoaderProps> = ({
  size = 6,
  color = "border-blue-500",
}) => (
  <div
    className={`loader inline-block h-${size} w-${size} border-4 border-solid rounded-full border-t-transparent ${color} animate-spin`}
  ></div>
);

export default Loader;
