import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определение типа продукта
type Product = {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
};

// Определение типа для ошибки
type ApiError = {
  message: string;
  statusCode: number;
};

// Создание асинхронного экшена для получения всех продуктов
export const fetchProducts = createAsyncThunk<
  Product[], // Изменено на массив продуктов
  void, // Убран параметр number, так как он не нужен для запроса всех продуктов
  { rejectValue: ApiError }
>("products/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    if (!response.ok) {
      return rejectWithValue({
        message: "Failed to fetch products",
        statusCode: response.status,
      });
    }
    const products = (await response.json()) as Product[];
    return products;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message, statusCode: 500 });
    }
    return rejectWithValue({
      message: "An unknown error occurred",
      statusCode: 500,
    });
  }
});

// Определение начального состояния
interface ProductState {
  products: Product[];
  loading: boolean;
  error: ApiError | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Создание среза
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      }
    );
    builder.addCase(
      fetchProducts.rejected,
      (state, action: PayloadAction<ApiError | undefined>) => {
        state.loading = false;
        state.error = action.payload || {
          message: "Unknown error",
          statusCode: 500,
        };
      }
    );
  },
});

export default productSlice.reducer;
