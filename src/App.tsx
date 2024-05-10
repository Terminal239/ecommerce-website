import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Home/Footer";

const App = () => {
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
