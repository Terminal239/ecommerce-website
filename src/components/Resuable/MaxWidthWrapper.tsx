import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const MaxWidthWrapper: React.FC<Props> = ({ className, children }) => {
  return <div className={`max-width-wrapper ${className}`}>{children}</div>;
};

export default MaxWidthWrapper;
