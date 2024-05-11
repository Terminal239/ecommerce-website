import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct, getProducts } from "../../../services/fetch";
import { RootState } from "../store";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  status: "idle" | "loading" | "success" | "error";
  error: string;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  status: "idle",
  error: "",
};

export const fetchProducts = createAsyncThunk("products/fetchAll", getProducts);
export const fetchProduct = createAsyncThunk("products/fetchOne", getProduct);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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
      });
  },
});

export const getAllProducts = (state: RootState) => state.products.products;
export const getSelectedProduct = (state: RootState) => state.products.selectedProduct;
export const getProductStatus = (state: RootState) => state.products.status;

export default productsSlice.reducer;
