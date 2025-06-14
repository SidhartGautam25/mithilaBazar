import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';

// Types
interface CartItem {
  product: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
}

interface ShippingInfo {
  [key: string]: any; // Allow any shipping properties since the original doesn't specify
}

interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
  removingId: string | null;
  shippingInfo: ShippingInfo;
}

interface AddItemParams {
  id: string;
  quantity: number;
}

interface ProductResponse {
  product: {
    _id: string;
    name: string;
    price: number;
    image: Array<{ url: string }>;
    stock: number;
  };
}

interface ApiError {
  message?: string;
  [key: string]: any;
}

// Add items to cart
export const addItemsToCart = createAsyncThunk<CartItem, AddItemParams, { rejectValue: ApiError }>(
  'cart/addItemsToCart',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data }: { data: ProductResponse } = await axios.get(`/api/v1/product/${id}`);

      return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.image[0].url,
        stock: data.product.stock,
        quantity
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data || { message: 'An Error Occurred' });
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[],
    loading: false,
    error: null,
    success: false,
    message: null,
    removingId: null,
    shippingInfo: JSON.parse(localStorage.getItem('shippingInfo') || '{}') as ShippingInfo
  } as CartState,
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeMessage: (state) => {
      state.message = null;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.removingId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.product != action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      state.removingId = null;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
      localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shippingInfo');
    }
  },
  extraReducers: (builder) => {
    // Add items to cart
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemsToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const item = action.payload;
        const existingItem = state.cartItems.find((i) => i.product === item.product);
        if (existingItem) {
          existingItem.quantity = item.quantity;
          state.message = `Updated ${item.name} quantity in the cart`;
        } else {
          state.cartItems.push(item);
          state.message = `${item.name} is added to cart successfully`;
        }
        state.loading = false;
        state.error = null;
        state.success = true;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'An error occurred';
      });
  }
});

export const { removeErrors, removeMessage, removeItemFromCart, saveShippingInfo, clearCart } = cartSlice.actions;
export default cartSlice.reducer;