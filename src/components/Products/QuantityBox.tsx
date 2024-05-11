import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addItemToCart, decrementItemCount, getCart, incrementItemCount } from "../../store/reducers/cartReducer";
import { getAllProducts } from "../../store/reducers/productsReducer";
import { getUser } from "../../store/reducers/userReducer";

interface Props {
  cartId?: string;
  productId?: string;
  count: number;
  size: "normal" | "small";
}

const QuantityBox: React.FC<Props> = ({ cartId, productId, size, count }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const products = useAppSelector(getAllProducts);
  const user = useAppSelector(getUser);

  const onClickIncrementCount = () => {
    const item = cart.find((item) => item.id === cartId);
    if (!item) {
      const product = products.find((item) => item.id === productId)!;
      dispatch(addItemToCart({ id: product.id, token: user!.token }));
      return;
    }

    dispatch(incrementItemCount({ id: item.id, token: user!.token }));
  };

  const onClickDecrementCount = () => {
    const item = cart.find((item) => item.id === cartId);
    if (!item) return;

    dispatch(decrementItemCount({ id: item.id, token: user!.token }));
  };

  return (
    <div className={`flex ${size === "normal" ? "h-[48px]" : "h-[32px]"} text-[12px] md:mr-8`}>
      <button onClick={onClickDecrementCount} className="border bg-gray-100 px-2 hover:bg-gray-200">
        <i className="fa-solid fa-minus"></i>
      </button>
      <input type="text" className="w-[40px] border text-center" disabled={true} value={count} />
      <button onClick={onClickIncrementCount} className="border bg-gray-100 px-2 hover:bg-gray-200">
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
};

export default QuantityBox;
