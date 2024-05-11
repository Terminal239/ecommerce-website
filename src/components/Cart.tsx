import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helper";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteItemFromCart, getCart } from "../store/reducers/cartReducer";
import { getUser } from "../store/reducers/userReducer";
import QuantityBox from "./Products/QuantityBox";
import Button from "./Resuable/Button";

const Cart = () => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const [checkoutDetails, setCheckoutDetails] = useState({
    total: 0,
    discounted: 0,
  });

  useEffect(() => {
    let total = 0;
    let discounted = 0;

    cart.forEach(({ item, count }) => {
      const { price, discountedPrice } = item;
      total = total + price * count;
      discounted = discounted + discountedPrice * count;
    });
    setCheckoutDetails({ total, discounted });
  }, [cart]);

  return (
    <section className="mx-auto mb-8 grid max-w-[1300px] gap-4 md:grid-cols-cart">
      <div className="mx-4 rounded ">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 border py-8 md:gap-4">
            <i className="fa-solid fa-cart-shopping text-lg text-gray-600 md:text-4xl"></i>
            {user ? (
              <p className="text-center md:text-lg">Items added will appear here...</p>
            ) : (
              <div>
                <p className="mx-auto w-3/4 text-center md:text-lg">Login, or Sign Up to add items to your cart!</p>
              </div>
            )}
          </div>
        ) : (
          cart.map(({ item, count, id }) => (
            <article key={item.id} className="mb-6 flex flex-col items-center gap-6 border p-6 min-[450px]:flex-row md:flex-row md:gap-12">
              <img className="mx-6 w-[96px] object-scale-down" src={item.image} alt={item.title} />
              <div className="flex flex-col">
                <p className="mb-2 text-base font-semibold md:text-xl">{item.title}</p>
                <div className="mb-4 flex items-center text-[12px] capitalize">
                  <i className="fa-solid fa-tags mr-2 text-[12px] md:text-base"></i>
                  {item.category.map((cat) => (
                    <span key={cat} className="rounded bg-gray-200 px-2 py-1 text-[12px] font-medium text-gray-800">
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="bold text-xl font-semibold">{formatCurrency(item.discountPercentage === 0 ? item.price * count : item.discountedPrice * count)}</span>
                  {item.discountPercentage !== 0 && <span className="mt-0.5 text-gray-600 line-through">{formatCurrency(item.price * count)}</span>}
                  {item.discountPercentage !== 0 && <p className="font-medium text-green-800">{item.discountPercentage}% off</p>}
                </div>
                <div className="flex h-[32px] gap-4">
                  <QuantityBox size="small" cartId={id} count={count} />
                  <Button onClick={() => dispatch(deleteItemFromCart({ id, token: user!.token }))} type="destructive">
                    Delete
                  </Button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
      <div className="mx-4 h-min rounded border p-6">
        <p className="mb-6 text-lg font-bold">Order Summary</p>
        <div className="mb-8 text-sm md:text-base">
          <div className="mb-2 flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">{formatCurrency(checkoutDetails.total)}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span>Discount</span>
            <span className="font-semibold">-{formatCurrency(checkoutDetails.total - checkoutDetails.discounted)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-semibold">{formatCurrency(checkoutDetails.discounted)}</span>
          </div>
        </div>
        <Button className="w-full" type="primary">
          Proceed to Checkout
        </Button>
      </div>
    </section>
  );
};

export default Cart;
