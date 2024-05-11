import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartItems, onAddToCart, onDeleteFromCart, onItemCountDecrement, onItemCountIncrement } from "../../../services/fetch"; // Import cart-related API functions
import { RootState } from "../store";

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "success" | "error";
  error: string;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: "",
};

export const fetchCart = createAsyncThunk("cart/fetch", getCartItems);
export const addItemToCart = createAsyncThunk("cart/addItem", onAddToCart);
export const deleteItemFromCart = createAsyncThunk("cart/removeItem", onDeleteFromCart);
export const incrementItemCount = createAsyncThunk("cart/increment", onItemCountIncrement);
export const decrementItemCount = createAsyncThunk("cart/decrement", onItemCountDecrement);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart(state) {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.items.push(action.payload);
        state.status = "success";
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action: PayloadAction<string>) => {
        const id = action.payload;
        state.items = state.items.filter((item) => item.id !== id);
        state.status = "success";
      })
      .addCase(incrementItemCount.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const updatedItem = action.payload;
        state.items = state.items.map((item) => (item.id === updatedItem.id ? updatedItem : item));
        state.status = "success";
      })
      .addCase(decrementItemCount.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const updatedItem = action.payload;
        state.items = state.items.map((item) => (item.id === updatedItem.id ? updatedItem : item));
        state.status = "success";
      });
  },
});

const selectUserState = (state: RootState) => state.user;
const selectCartState = (state: RootState) => state.cart;
export const getCart = createSelector(selectUserState, selectCartState, (user, cart) => (user ? cart.items : []));

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
