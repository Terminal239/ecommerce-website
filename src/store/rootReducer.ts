import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import filterReducer from "./reducers/filterReducer";
import productsReducer from "./reducers/productsReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  filter: filterReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
