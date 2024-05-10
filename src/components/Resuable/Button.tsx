import clsx from "clsx";
import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  type: "primary" | "secondary" | "tertiary" | "cart" | "buy" | "destructive";
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, className, children, disabled, onClick }) => {
  // Base Classes (common to all button types)
  const baseClasses = clsx("flex items-center justify-center gap-2 rounded border", "px-4 py-2 text-sm font-semibold shadow-sm transition-all", "md:px-8 md:text-base");

  // Type-specific classes
  let typeClasses = "";
  switch (type) {
    case "primary":
      typeClasses = "btn-primary hover:bg-black hover:text-white";
      break;
    case "secondary":
      typeClasses = "btn-secondary hover:bg-black hover:text-white";
      break;
    case "cart":
      typeClasses = "text-white bg-[#22c55e] hover:bg-[#16a34a]";
      break;
    case "buy":
      typeClasses = "text-white bg-[#1e40af] hover:bg-[#1e3a8a]";
      break;
    case "destructive":
      typeClasses = "hover:bg-red-600 hover:text-red-50";
      break;
    default:
      break;
  }

  return (
    <button disabled={disabled} onClick={onClick} className={clsx(baseClasses, typeClasses, className)}>
      {children}
    </button>
  );
};

export default Button;
