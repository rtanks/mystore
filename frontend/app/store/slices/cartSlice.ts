import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// import { HYDRATE } from "next-redux-wrapper";
// import type { AnyAction } from '@reduxjs/toolkit'

interface CartSate {
    totalQuantity: number;
}

const initialState:CartSate = {
    totalQuantity: 0,
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getTotalQuantity: (state, action: PayloadAction<{total : number}>) => {
            state.totalQuantity = action.payload.total;
        },
        setTotalQuantity: (state, action: PayloadAction<{total : number}>) => {
            state.totalQuantity = action.payload.total;
            console.log('hi',action.payload.total)
            Cookies.set("totalItem", JSON.stringify(action.payload.total));
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(HYDRATE, (state, action: AnyAction) => {
    //         if(action.payload.cart) {
    //             state.totalQuantity = action.payload.cart.totalQuantity
    //         }
    //     })
    // }
})

export const { getTotalQuantity, setTotalQuantity } = cartSlice.actions;

export default cartSlice.reducer;