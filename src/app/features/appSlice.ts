import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { getCategories, getProduct, getProducts, onAddToCart, onDeleteFromCart, onItemCountDecrement, onItemCountIncrement } from "../../../services/fetch";
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

interface State {
  products: Product[];
  categories: string[];
  selectedProduct: Product | null;
  filter: Filter;
  cart: CartItem[];
  status: "idle" | "loading" | "success" | "error";
  error: string;
  user: User | null;
}

const initialFilter = {
  searchTerm: "",
  categories: [],
  ratings: [],
  price: {
    max: Infinity,
    min: 0,
  },
};

const initialState: State = {
  products: [],
  categories: [],
  selectedProduct: null,
  filter: initialFilter,
  cart: [],
  status: "idle",
  error: "",
  user: null,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", getProducts);
export const fetchProduct = createAsyncThunk("products/fetchOne", getProduct);
export const fetchCategories = createAsyncThunk("filter/fetchCategories", getCategories);
export const addItemToCart = createAsyncThunk("cart/addItem", onAddToCart);
export const deleteItemFromCart = createAsyncThunk("cart/removeItem", onDeleteFromCart);
export const incrementItemCount = createAsyncThunk("cart/increment", onItemCountIncrement);
export const decrementItemCount = createAsyncThunk("cart/decrement", onItemCountDecrement);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateRatings(state, action: PayloadAction<number>) {
      const rating = action.payload;

      const index = state.filter.ratings.indexOf(rating);
      if (index !== -1) state.filter.ratings.splice(index, 1);
      else state.filter.ratings.push(rating);
    },
    updateCategories(state, action: PayloadAction<string>) {
      const category = action.payload;

      const index = state.filter.categories.indexOf(category);
      if (index !== -1) state.filter.categories.splice(index, 1);
      else state.filter.categories.push(category);
    },
    updateRange(state, action: PayloadAction<{ name: "max" | "min"; value: number }>) {
      const { name, value } = action.payload;
      state.filter.price[name] = value;
    },
    updateSearchTerm(state, action: PayloadAction<string>) {
      const term = action.payload;
      state.filter.searchTerm = term;
    },
    resetFilter(state) {
      state.filter = initialFilter;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.cart.findIndex((item) => item.id === id);
      state.cart.splice(index, 1);
    },
    setUser(state, action: PayloadAction<LoginResponse>) {
      state.user = action.payload;
      state.cart = action.payload.cart;
    },
    removeUser(state) {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "error";
        // @ts-expect-error:next-line
        state.error = action.payload.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = "success";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "error";
        // @ts-expect-error:next-line
        state.error = action.payload.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const item = action.payload;
        state.cart.push(item);
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action: PayloadAction<string>) => {
        const id = action.payload;
        state.cart = state.cart.filter((item) => item.id !== id);
      })
      .addCase(incrementItemCount.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const updated = action.payload;
        state.cart = state.cart.map((item) => (item.id === updated.id ? updated : item));
      })
      .addCase(decrementItemCount.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const updated = action.payload;
        console.log(updated);
        state.cart = state.cart.map((item) => (item.id === updated.id ? updated : item));
      });
  },
});

export const getAllProducts = (state: RootState) => state.state.products;
export const getAllCategories = (state: RootState) => state.state.categories;
export const getFilter = (state: RootState) => state.state.filter;
export const getStatus = (state: RootState) => state.state.status;
export const getSelectedProduct = (state: RootState) => state.state.selectedProduct;
export const getUser = (state: RootState) => state.state.user;

const user = (state: RootState) => state.state.user;
const cart = (state: RootState) => state.state.cart;
export const getCart = createSelector([user, cart], (user, cart) => {
  return user ? cart : [];
});

export const { updateSearchTerm, updateRatings, updateCategories, updateRange, resetFilter, removeFromCart, setUser, removeUser } = productsSlice.actions;
export default productsSlice.reducer;
