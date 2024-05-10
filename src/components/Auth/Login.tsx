import { useEffect } from "react";
import useInput from "../../hooks/useInput";
import { FormData } from "./Auth";

interface Props {
  setData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Login: React.FC<Props> = ({ setData }) => {
  const { data: email, element: EmailInput } = useInput({ name: "email", placeholder: "john.smith@example.com", type: "email" });
  const { data: password, element: PasswordInput } = useInput({ name: "password", placeholder: "A strong password...", type: "password" });

  useEffect(() => {
    setData((prev) => ({ ...prev, email, password }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  return (
    <>
      {EmailInput}
      {PasswordInput}
    </>
  );
};

export default Login;
