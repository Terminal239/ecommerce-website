import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import Button from "./Resuable/Button";
import { removeUser } from "../store/reducers/userReducer";

interface Props {
  cart: CartItem[];
  user: User | null;
  setshowMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<Props> = ({ cart, user, setshowMobileNav }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-y-0 left-32 right-0 bg-white px-6 py-8 shadow sm:left-1/2">
      <div className="flex flex-col gap-4">
        {user ? (
          <>
            <p className="text-center">
              Welcome, <span className="font-bold">{user.username}</span>
            </p>
            <Button
              type="primary"
              onClick={() => {
                dispatch(removeUser());
                setshowMobileNav(false);
                navigate("/auth");
              }}
              className="w-full px-6 py-2 hover:bg-black hover:text-white"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              navigate("/auth");
              setshowMobileNav(false);
            }}
            type="primary"
          >
            Sign In
          </Button>
        )}
        <button
          onClick={() => {
            navigate("/cart");
            setshowMobileNav(false);
          }}
          className="flex w-full items-center justify-center gap-2 rounded border px-6 py-2 shadow-sm transition-all hover:bg-black hover:text-white"
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <p>Cart</p>
          <span className="font-bold">({cart.length})</span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
