import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCategories, getFilter, resetFilter, updateCategories, updateRange, updateRatings } from "../store/reducers/filterReducer";
import { fetchCategories, getProductStatus } from "../store/reducers/productsReducer";
import Button from "./Resuable/Button";

const MAX_STARS = 5;
const STARS = [5, 4, 3, 2, 1];

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategories);
  const status = useAppSelector(getProductStatus);

  const { categories: selected } = useAppSelector(getFilter);
  const onCategoryClick = (category: string) => dispatch(updateCategories(category));

  useEffect(() => {
    if (categories.length === 0 && status !== "error") dispatch(fetchCategories);
  }, []);

  return (
    <div>
      <p className="mb-2 text-base font-medium md:text-lg">Categories</p>
      <div className="space-y-2">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          categories.map((category) => (
            <div key={category} className="flex items-center">
              <input onChange={() => onCategoryClick(category)} checked={selected.includes(category)} type="checkbox" id={category} />
              <label className="ml-2 cursor-pointer text-[12px] font-medium capitalize md:text-sm" htmlFor={category}>
                {category}
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Ratings = () => {
  const dispatch = useAppDispatch();
  const { ratings } = useAppSelector(getFilter);

  const onRatingClick = (count: number) => dispatch(updateRatings(count));

  return (
    <div className="mt-6 sm:mt-0">
      <p className="mb-2 text-base font-medium md:text-lg">Ratings</p>
      <div className="space-y-2">
        {STARS.map((count) => {
          const elements = [];
          for (let i = 0; i < count; i++) elements.push(<i key={`fa-star-solid-${i + "" + count}`} className="fa-solid fa-star"></i>);
          for (let i = 0; i < MAX_STARS - count; i++) elements.push(<i key={`fa-star-regular-${i + "" + count}`} className="fa-regular fa-star"></i>);

          return (
            <div key={count} className="flex items-center">
              <input onChange={() => onRatingClick(count)} type="checkbox" checked={ratings.includes(count)} id={`rating-${count}`} />
              <label htmlFor={`rating-${count}`} className="ml-2 flex cursor-pointer items-center gap-1 text-[12px] font-medium md:text-sm">
                {elements}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PriceRange = () => {
  const dispatch = useAppDispatch();

  const { price } = useAppSelector(getFilter);
  const { min, max } = price;

  const onPriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateRange({ name: event.target.name as "min" | "max", value: +event.target.value }));

  return (
    <div className="mt-6 md:mt-0">
      <p className="mb-2 text-base font-medium md:text-lg">Price Range</p>
      <div className="flex items-center">
        <input onChange={onPriceRangeChange} value={min} className="mr-2 w-24 border py-1 pl-2 text-sm md:text-base" id="price-min" placeholder="Min" type="number" name="min" />
        <span className="mx-2">-</span>
        <input onChange={onPriceRangeChange} value={isFinite(max) ? max : 9999999} className="ml-2 w-24 border py-1 pl-2 text-sm md:text-base" id="price-max" placeholder="Max" type="number" name="max" />
      </div>
    </div>
  );
};

const Filter = () => {
  const dispatch = useAppDispatch();

  const { width } = useWindowSize();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onClickResetFilter = () => {
    dispatch(resetFilter());
  };

  return (
    <aside className="h-min rounded-lg border bg-white px-6 py-4 shadow-sm md:inset-x-8 lg:m-0">
      {width! < 1024 ? (
        <button onClick={() => setIsExpanded((prev) => !prev)} className="w-full">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-filter text-sm md:text-base"></i>
            <p className="font-semibold">Filters</p>
            {isExpanded ? <i className="fa-solid fa-chevron-up ml-auto text-sm md:text-base"></i> : <i className="fa-solid fa-chevron-down ml-auto text-sm md:text-base"></i>}
          </div>
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <i className="fa-solid fa-filter"></i>
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
      )}
      {(isExpanded || width! >= 1024) && (
        <div className=" mt-4 grid w-full min-w-max grid-cols-1 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 lg:space-y-6">
          <Categories />
          <Ratings />
          <PriceRange />
          <Button onClick={onClickResetFilter} type="primary" className="mt-4 w-full sm:col-span-2  md:col-span-3 lg:col-span-1">
            Reset Filter
          </Button>
        </div>
      )}
    </aside>
  );
};

export default Filter;
