import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCategoryList } from "../../../services/fetch";
import { RootState } from "../store";

interface Filter {
  searchTerm: string;
  categories: string[];
  selected: string[];
  ratings: number[];
  price: {
    max: number;
    min: number;
  };
}

const initialFilter: Filter = {
  searchTerm: "",
  categories: [],
  selected: [],
  ratings: [],
  price: {
    max: Infinity,
    min: 0,
  },
};

export const fetchCategories = createAsyncThunk("categories/fetchAll", getCategoryList);

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

      const index = state.selected.indexOf(category);
      if (index !== -1) state.selected.splice(index, 1);
      else state.selected.push(category);
    },
    updateRange(state, action: PayloadAction<{ name: "max" | "min"; value: number }>) {
      const { name, value } = action.payload;
      state.price[name] = value;
    },
    updateSearchTerm(state, action: PayloadAction<string>) {
      const term = action.payload;
      state.searchTerm = term;
    },
    resetFilter() {
      return initialFilter;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    });
  },
});

export const getCategories = (state: RootState) => state.filter.categories;
export const getSelected = (state: RootState) => state.filter.selected;
export const getFilter = (state: RootState) => state.filter;

export const { updateSearchTerm, updateRatings, updateCategories, updateRange, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
