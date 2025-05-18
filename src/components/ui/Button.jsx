// src/components/ui/Button.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  ...props
}) => {
  const base = `rounded-lg px-4 py-2 font-medium transition-all`;

  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-800 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    ghost: "bg-transparent hover:bg-gray-700 text-white border border-gray-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
