import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice.ts";
import userReducer from "./user/userSlice.ts";
import orderReducer from "./order/orderSlice.ts";
import cartReducer from "./cart/cartSlice.ts";


export const store=configureStore({
reducer:{
    product:productReducer,
    user:userReducer,
    cart:cartReducer,
    order:orderReducer,
}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;