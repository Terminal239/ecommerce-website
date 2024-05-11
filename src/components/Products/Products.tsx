import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getFilter } from "../../store/reducers/filterReducer";
import { fetchProducts, getAllProducts, getProductStatus } from "../../store/reducers/productsReducer";
import Filter from "../Filter";
import ProductCard from "./ProductCard";

const Products = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(getProductStatus);
  const products = useAppSelector(getAllProducts);
  const filter = useAppSelector(getFilter);

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const { searchTerm, categories, ratings, price } = filter;

        if (!product.title.toLowerCase().startsWith(searchTerm.toLowerCase())) return;
        if (categories.length !== 0 && !categories.some((category) => product.category.includes(category))) return;
        if (ratings.length !== 0 && !ratings.includes(Math.round(product.rating.rate))) return;
        if (!(price.min <= product.discountedPrice && product.discountedPrice <= price.max)) return;

        return product;
      }),
    [filter, products]
  );

  useEffect(() => {
    if (products.length === 0 && status !== "error") dispatch(fetchProducts());
  }, [dispatch, products]);

  return (
    <div className="mx-4 mb-12 gap-4 md:mx-8 lg:grid lg:grid-cols-result">
      <Filter />
      {status === "loading" ? (
        <div className="flex size-full flex-col items-center justify-center gap-4 py-16">
          <i className="fa-solid fa-spinner spinner text-4xl"></i>
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-products gap-4 py-16 lg:py-0">
          {filtered.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
