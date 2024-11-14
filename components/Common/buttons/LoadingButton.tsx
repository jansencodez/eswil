import React, { ReactNode } from "react";
import Loader from "./Loader";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  onClick: () => void;
  children: ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  onClick,
  children,
  ...props
}) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`flex items-center justify-center px-4 py-2 text-white bg-yellow-700 rounded-lg shadow-md  w-full hover:bg-yellow-600 transition-colors duration-300 focus:outline-none ${
      isLoading ? "opacity-75 cursor-not-allowed" : ""
    }`}
    {...props}
  >
    {isLoading ? <Loader size={5} color="border-white" /> : children}
  </button>
);

export default LoadingButton;
