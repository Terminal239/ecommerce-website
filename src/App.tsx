import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Home/Footer";
import { useAppDispatch } from "./store/hooks";
import { fetchCart } from "./store/reducers/cartReducer";
import { setUser } from "./store/reducers/userReducer";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      dispatch(setUser(parsed));
      dispatch(fetchCart(parsed.token));
    }
  }, []);

  return (
    <>
      <Header />
      <main className="relative flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
