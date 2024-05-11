import { useEffect } from "react";
import useInput from "../../hooks/useInput";
import { FormData } from "./Auth";

interface Props {
  error: boolean;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Login: React.FC<Props> = ({ error, setData }) => {
  const { data: email, element: EmailInput } = useInput({ name: "email", placeholder: "john.smith@example.com", type: "email", isError: error });
  const { data: password, element: PasswordInput } = useInput({ name: "password", placeholder: "A strong password...", type: "password", isError: error });

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
