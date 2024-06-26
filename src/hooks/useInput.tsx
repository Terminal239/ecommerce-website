import { HTMLInputTypeAttribute, ReactNode, useState } from "react";

interface Props {
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  placeholder: string;
  isError: boolean;
}

interface Export {
  element: ReactNode;
  data: string;
}

const useInput = ({ isError, name, type, placeholder, className }: Props): Export => {
  const [data, setData] = useState("");
  const element = (
    <input
      className={`mb-2 w-full rounded border px-4 py-2 text-base shadow-sm placeholder:text-sm last-of-type:mb-0 md:p-2 ${className} ${isError ? "border-red-500 text-red-500" : ""}`}
      type={type}
      name={name}
      value={data}
      placeholder={placeholder}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData(event.target.value)}
    />
  );

  return { element, data };
};

export default useInput;
