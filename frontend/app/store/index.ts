import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from 'next-redux-wrapper';
import LoginReducer from './slices/loginSlice';
import CartReducer from "./slices/cartSlice";

const makeStore = () => configureStore({
    reducer: {
        login: LoginReducer,
        cart: CartReducer,
    }
})

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const store = makeStore();
export const wrapper = createWrapper<AppStore>(makeStore)