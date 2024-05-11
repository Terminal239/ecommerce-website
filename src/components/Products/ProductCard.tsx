import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/helper";

const ProductCard = ({ id, title, image, rating, discountedPrice, price, discountPercentage }: Product) => {
  return (
    <div key={title} className="flex flex-col rounded border p-4 pr-8 hover:shadow">
      <div className="mx-auto mb-8 flex size-[196px] items-center justify-center md:size-[220px]">
        <img className="mx-auto size-full object-contain px-8" src={image} alt={title} />
      </div>
      <div className="flex flex-col gap-1">
        <Link to={`/products/${id}`} className="group hover:text-purple-600">
          <h3 className="text-lg font-semibold leading-[1.3]">{title}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex w-min items-center gap-2 rounded-sm bg-green-600 p-1 pb-1.5 text-[12px] leading-none text-white md:px-2">
            <span className="mt-[1.5px]">{rating.rate}</span>
            <i className="fa-solid fa-star"></i>
          </div>
          <span className="mb-[1.5px] text-[12px] text-gray-500 md:text-base">({rating.count})</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold">{formatCurrency(discountPercentage === 0 ? price : discountedPrice)}</p>
          {discountPercentage !== 0 && <del className="text-base text-gray-500">{formatCurrency(price)}</del>}
          {discountPercentage !== 0 && <p className="font-semibold text-green-800">{discountPercentage}% off</p>}
        </div>
        <p className="text-[12px]">Free Delivery</p>
      </div>
    </div>
  );
};

export default ProductCard;
