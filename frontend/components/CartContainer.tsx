'use client'
import { AppDispatch } from "@/app/store";
import { setTotalQuantity } from "@/app/store/slices/cartSlice";
import { CartItem } from "@/app/types/type";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function CartContainer({cartItems}:{cartItems:CartItem[]}) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.quantity,0);
        dispatch(setTotalQuantity({total: total}));
    },[cartItems, dispatch])
    return(
        <div className="w-full h-[85vh] flex flex-col flex-wrap gap-1 p-[2%]">
            {
                cartItems.length == 0 ? "" : (
                    cartItems.map(item => (
                        <div key={item._id} className="w-96 h-max flex flex-row items-center gap-3 shadow rounded-lg p-1">
                            <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.image}`} alt={item.name} className="w-32 h-20"/>
                            <div>
                                <span className="font-bold text-md">{item.name}</span>
                                <div>
                                    <span>{item.price}$</span>
                                    <span>{item.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}