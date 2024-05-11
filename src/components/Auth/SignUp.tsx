import { useEffect } from "react";
import useInput from "../../hooks/useInput";
import { FormData } from "./Auth";

interface Props {
  error: boolean;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
}

const SignUp: React.FC<Props> = ({ error, setData }) => {
  const { data: username, element: UsernameInput } = useInput({ name: "username", placeholder: "John Smith", type: "text", isError: error });
  const { data: email, element: EmailInput } = useInput({ name: "email", placeholder: "john.smith@example.com", type: "email", isError: error });
  const { data: password, element: PasswordInput } = useInput({ name: "password", placeholder: "A strong password...", type: "password", isError: error });

  useEffect(() => {
    setData((prev) => ({ ...prev, username, email, password }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, username]);

  return (
    <>
      {UsernameInput}
      {EmailInput}
      {PasswordInput}
    </>
  );
};

export default SignUp;
