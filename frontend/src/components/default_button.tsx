import React from "react";

interface DefaultButtonProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  text?: string;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  icon,
  onClick,
  className,
  text
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center justify-center w-12 h-12 
      bg-primary text-white rounded-full 
      transition-all duration-300 ease-in-out 
      outline-none hover:bg-primary-70 
      active:bg-primary-80 
      focus:ring-4 focus:ring-primary-20 
      ${className} cursor-pointer
    `}
  >
    {icon && <span>{icon}</span>}
    <span>{text}</span>
  </button>
);

export default DefaultButton;
