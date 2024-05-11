import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Filter {
  searchTerm: string;
  categories: string[];
  ratings: number[];
  price: {
    max: number;
    min: number;
  };
}

const initialFilter: Filter = {
  searchTerm: "",
  categories: [],
  ratings: [],
  price: {
    max: Infinity,
    min: 0,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilter,
  reducers: {
    updateRatings(state, action: PayloadAction<number>) {
      const rating = action.payload;

      const index = state.ratings.indexOf(rating);
      if (index !== -1) state.ratings.splice(index, 1);
      else state.ratings.push(rating);
    },
    updateCategories(state, action: PayloadAction<string>) {
      const category = action.payload;

      const index = state.categories.indexOf(category);
      if (index !== -1) state.categories.splice(index, 1);
      else state.categories.push(category);
    },
    updateRange(state, action: PayloadAction<{ name: "max" | "min"; value: number }>) {
      const { name, value } = action.payload;
      state.price[name] = value;
    },
    updateSearchTerm(state, action: PayloadAction<string>) {
      const term = action.payload;
      state.searchTerm = term;
    },
    resetFilter(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialFilter;
    },
  },
});

export const getCategories = (state: RootState) => state.filter.categories;
export const getFilter = (state: RootState) => state.filter;

export const { updateSearchTerm, updateRatings, updateCategories, updateRange, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
