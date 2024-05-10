import { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onUserLogin } from "../../../services/fetch";
import { setUser } from "../../app/features/appSlice";
import Button from "../Resuable/Button";
import Login from "./Login";
import SignUp from "./SignUp";

export interface FormData {
  username: string;
  password: string;
  email: string;
}

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await onUserLogin(formData.email, formData.password);
      setLoading(false);
      dispatch(setUser(response));
      navigate("/products");
    } catch (error) {
      if (error instanceof AxiosError) console.log(error.message);
    }
  };

  return (
    <main className="flex size-full flex-col items-center justify-center gap-4">
      <h1 className="title text-xl tracking-widest md:text-3xl">MODERN ESSENTIALS</h1>{" "}
      <div className="mx-4 flex flex-col rounded border p-6 shadow md:size-[416px] md:p-8">
        <h2 className="mb-4 font-bold md:text-2xl">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={onSubmit} className="mb-12">
          {isLogin ? <Login setData={setFormData} /> : <SignUp setData={setFormData} />}
        </form>
        <div className="mt-auto flex flex-col gap-4">
          <Button disabled={loading} onClick={onSubmit} type="primary">
            {isLogin ? "Sign In" : "Create an account"} {loading && <i className="fa-solid fa-spinner spinner"></i>}
          </Button>
          <div className="flex items-center justify-center">
            <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
            <button onClick={() => setIsLogin((prev) => !prev)}>
              <span className="ml-2 font-bold hover:underline">{isLogin ? "Sign Up" : "Login"}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
