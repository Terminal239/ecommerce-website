import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../../utils/helper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { addItemToCart, getCart } from "../../store/reducers/cartReducer";
import { fetchProduct, getProductStatus, getSelectedProduct } from "../../store/reducers/productsReducer";
import { getUser } from "../../store/reducers/userReducer";
import Button from "../Resuable/Button";
import QuantityBox from "./QuantityBox";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getProductStatus);
  const user = useAppSelector(getUser);
  const cart = useAppSelector(getCart);
  const product = useAppSelector(getSelectedProduct);
  const [selectedImage, setSelectedImage] = useState("");
  const [pending, setPending] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    if ((!product && status !== "error") || (product && product.id !== id!)) dispatch(fetchProduct(id!));
  }, [dispatch, id, product]);

  if (status === "loading") {
    return (
      <div className="flex size-full flex-col items-center justify-center gap-4 pt-12">
        <i className="fa-solid fa-spinner spinner text-4xl"></i>
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!id || !product)
    return (
      <div className="flex flex-col justify-center gap-8 pt-8 text-center">
        <i className="fa-solid fa-face-frown text-6xl"></i>
        <div className="flex flex-col gap-2">
          <span className="text-5xl font-bold">404</span>
          <span className="text-lg font-bold">Not Found</span>
        </div>
        <p className="text-gray-600">Requested resource does not exist!</p>
      </div>
    );

  if (!selectedImage || selectedImage !== product.image) {
    setSelectedImage(product.image);
  }

  const found = cart.find((item) => item.item.id === id);
  const count = found?.count || 0;
  const { title, price, description, category, image, discountPercentage, discountedPrice, features, rating, reviews } = product;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < +rating.rate.toFixed(0); i++) stars.push(<i key={`fa-solid-${i}`} className="fa-solid fa-star"></i>);
    for (let i = 0; i < 5 - +rating.rate.toFixed(0); i++) stars.push(<i key={`fa-regular-${i}`} className="fa-regular fa-star"></i>);

    return stars;
  };

  const onClickAddToCart = async () => {
    try {
      if (!found) {
        setPending(true);
        dispatch(addItemToCart({ id: product.id, token: user!.token }));
        setPending(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) console.log(error.message);
    }
  };

  return (
    <>
      <section className="mx-auto mb-24 mt-16 flex max-w-[1110px] flex-col items-center gap-16 px-4 md:w-4/5 lg:w-full lg:flex-row">
        <div className="flex flex-1 flex-col-reverse overflow-hidden md:flex-row">
          <div className="w-full">
            <img className="h-[124px] border object-scale-down p-6 lg:w-full" src={image} alt={title} />
          </div>
          <img className="w-[296px] border p-12 md:w-[386px] md:p-16" src={selectedImage} alt={title} />
        </div>
        <div className="flex-1 self-center">
          <div className="mb-4 flex items-center text-[12px] capitalize md:text-base">
            <i className="fa-solid fa-tags mr-2 text-sm md:text-base"></i>
            {category.map((item) => (
              <span key={item} className="rounded bg-gray-200 px-2 py-1 font-medium text-gray-800">
                {item}
              </span>
            ))}
          </div>
          <h2 className="mb-4 text-2xl font-bold leading-none tracking-tight md:text-4xl">{title}</h2>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-sm font-bold text-yellow-500">
              <span className="mt-0.5">{rating.rate.toFixed(1)}</span>
              {renderStars()}
            </div>
            <span className="text-sm text-gray-600">{rating.count} ratings</span>
          </div>
          <p className="mb-4 text-sm leading-[1.7] md:text-base">{description}</p>
          <div className="mb-8 flex items-center gap-4">
            <span className="bold text-3xl font-semibold">{formatCurrency(discountPercentage === 0 ? price : discountedPrice)}</span>
            {discountPercentage !== 0 && <span className="mt-0.5 text-gray-600 line-through">{formatCurrency(price)}</span>}
            {discountPercentage !== 0 && <p className="font-semibold text-green-800">{discountPercentage}% off</p>}
          </div>
          <div className="flex flex-col-reverse items-stretch gap-4 md:flex-row md:justify-between">
            <QuantityBox size="normal" productId={product.id} cartId={found?.id} count={count} />
            <div className="flex w-full gap-2 md:w-auto">
              <Button disabled={user === null ? true : false} className="flex-1 py-3 disabled:bg-gray-400 disabled:text-white md:flex-none md:py-2" type="buy">
                <i className="fa-solid fa-credit-card"></i>Buy Now
              </Button>
              <Button disabled={user === null ? true : false} onClick={onClickAddToCart} className="flex-1 py-3 disabled:bg-gray-400 disabled:text-white md:flex-none md:py-2" type="cart">
                <i className="fa-solid fa-cart-plus"></i>Add to Cart {pending && <i className="fa-solid fa-spinner spinner"></i>}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto mb-24 grid max-w-screen-lg gap-4 gap-y-12 border-t px-4 pt-8 text-sm md:w-4/5 md:grid-cols-2 md:p-8 md:text-base lg:w-full">
        <div>
          <h3 className="mb-6 text-2xl font-bold leading-none tracking-tight">Product Features</h3>
          <ul className="list-inside list-disc">
            {features.map((feature, index) => (
              <li key={index} className="mb-2 last-of-type:mb-0">
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-6 text-2xl font-bold leading-none tracking-tight">Customer Reviews</h3>
          <div>
            {reviews.map(({ user, rating, comment }) => {
              const stars = [];

              for (let i = 0; i < rating; i++) stars.push(<i key={`rating-solid-${i}`} className="fa-solid fa-star"></i>);
              for (let i = 0; i < 5 - rating; i++) stars.push(<i key={`rating-regular-${i}`} className="fa-regular fa-star"></i>);

              return (
                <article key={user} className="mb-12 flex gap-4 border-b pb-6 md:pb-8">
                  <div className="flex size-10 items-center justify-center rounded-full border text-sm">
                    <i className="fa-regular fa-user"></i>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-bold">{user}</h4>
                      <div className="text-[12px] text-gray-600">{stars}</div>
                    </div>
                    <p className="text-sm">{comment}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
