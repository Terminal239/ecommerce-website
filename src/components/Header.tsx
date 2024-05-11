import { useWindowSize } from "@uidotdev/usehooks";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCart, resetCart } from "../store/reducers/cartReducer";
import { getFilter, updateSearchTerm } from "../store/reducers/filterReducer";
import { getUser, removeUser } from "../store/reducers/userReducer";
import MobileMenu from "./MobileMenu";
import Button from "./Resuable/Button";

const Header = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const cart = useAppSelector(getCart);
  const { searchTerm } = useAppSelector(getFilter);
  const [expandUserInfo, setExpandUserInfo] = useState(false);
  const [showMobileNav, setshowMobileNav] = useState(false);
  const [error, setError] = useState("");

  const [term, setTerm] = useState("");

  const onSearch = (event?: FormEvent) => {
    if (event) event.preventDefault();
    if (term.length === 0) {
      setError("Search term cannot be blank!");
      setTimeout(() => {
        setError("");
      }, 5000);
    }

    dispatch(updateSearchTerm(term));
    navigate("/products");
  };

  const onSignOut = () => {
    dispatch(removeUser());
    dispatch(resetCart());
    localStorage.removeItem("user");
  };

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  return (
    <header className="p-4 text-sm md:p-8 lg:text-base">
      <div className="flex items-center justify-between gap-4 md:gap-16">
        <h1 className="title text-base tracking-widest md:text-3xl">
          <Link to="/">MODERN ESSENTIALS</Link>
        </h1>
        <div className="hidden flex-1 gap-2 lg:flex">
          <form onSubmit={(event) => onSearch(event)} className="relative w-full">
            <div className="relative h-full">
              <input value={term} onChange={(event) => setTerm(event.target.value)} className={`size-full border px-4 ${error.length > 0 ? "border-red-500" : ""}`} type="text" placeholder="Search for products..." />
              {error && <p className="absolute -bottom-6 left-4 text-sm font-medium text-red-500">{error}</p>}
            </div>
            {searchTerm.length > 0 && (
              <button onClick={() => dispatch(updateSearchTerm(""))} className="absolute  right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full border hover:bg-gray-200">
                <i className="fa-solid fa-xmark text-sm text-gray-400"></i>
              </button>
            )}
          </form>
          <Button onClick={() => onSearch()} type="secondary">
            Search
          </Button>
        </div>
        <div className="hidden gap-4 lg:flex">
          {user ? (
            <>
              <div className="relative flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-full bg-black leading-none text-white">
                  <button className="size-full" onClick={() => setExpandUserInfo((prev) => !prev)}>
                    {user.username.charAt(0).toUpperCase()}
                  </button>
                </div>
                {expandUserInfo && (
                  <div className="absolute left-0 top-14 z-10 w-max overflow-hidden rounded bg-white shadow">
                    <div className="border-b p-4 px-6">
                      <p>
                        Welcome, <span className="font-bold">{user.username}</span>
                      </p>
                    </div>
                    <button onClick={() => dispatch(removeUser())} className="w-full px-6 py-2 hover:bg-black hover:text-white">
                      <i className="fa-solid fa-right-from-bracket"></i> Sign Out
                    </button>
                  </div>
                )}
              </div>
              <Button onClick={() => onSignOut()} type="primary">
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")} type="primary">
              Sign In
            </Button>
          )}
          <button onClick={() => navigate("/cart")} className="flex items-center gap-2  rounded border px-6 py-2 transition-all hover:bg-black hover:text-white">
            <i className="fa-solid fa-cart-shopping"></i>
            <p>Cart</p>
            <span className="font-bold">({cart.length})</span>
          </button>
        </div>
        <button onClick={() => setshowMobileNav(true)} className="size-8 rounded border md:size-12 lg:hidden">
          <i className="fa-solid fa-bars text-xl md:text-2xl"></i>
        </button>
      </div>
      <div className="mt-4 flex flex-1 gap-2 lg:hidden">
        <input className="w-full border px-4" type="text" placeholder="Search for products..." />
        <Button onClick={() => onSearch()} type="secondary">
          Search
        </Button>
      </div>
      {width! < 1024 && showMobileNav && createPortal(<div onClick={() => setshowMobileNav(false)} className="fixed inset-0 bg-black/50"></div>, document.body)}
      {width! < 1024 && showMobileNav && createPortal(<MobileMenu setshowMobileNav={setshowMobileNav} user={user} cart={cart} />, document.body)}
    </header>
  );
};

export default Header;
