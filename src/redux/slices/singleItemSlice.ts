import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
  rating: {
    count: number;
    rate: number;
  };
}

type ApiError = {
  message: string;
  statusCode: number;
};

export const fetchProduct = createAsyncThunk<
  Product,
  string,
  { rejectValue: ApiError }
>("fetch/Item", async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${productId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.message,
        statusCode: error.response?.status || 500,
      });
    }
    return rejectWithValue({
      message: "An unknown error occurred",
      statusCode: 500,
    });
  }
});

interface ProductState {
  product: Product | null; // Используйте null для инициализации пока данные не загружены
  loading: boolean;
  error: ApiError | null;
}

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

const singelItemSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      }
    );
    builder.addCase(
      fetchProduct.rejected,
      (state, action: PayloadAction<ApiError | undefined>) => {
        state.loading = false;
        state.error = action.payload || {
          message: "Unkown error",
          statusCode: 500,
        };
      }
    );
  },
});

export default singelItemSlice.reducer;
