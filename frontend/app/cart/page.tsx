'use client'

import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import Loading from "./loading"
import { useEffect, useState } from "react"
import { CartItem } from "../types/type"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { setTotalQuantity } from "../store/slices/cartSlice"
import IncreaseCartItem from "@/components/IncreaseCartItem"
import DecreaseCartItem from "@/components/DecreaseCartItem"
import RemoveCartItem from "@/components/RemoveCartItem"


export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const userId = Cookies.get('userId')
    const dispatch = useDispatch<AppDispatch>();
    const {data, isLoading} = useQuery({queryKey:['cartItems'], queryFn: async () => {
        const response = fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/${userId}/items`);
        return (await response).json();
    }})
    console.log(data)
    useEffect(() => {
        if(data) {
            setCartItems(data.items)
            const items: CartItem[] = data.items;
            const total = items.reduce((sum, item) => sum + item.quantity,0);
            dispatch(setTotalQuantity({total: total}));
            console.log(data.items)
            console.log(total);
        }
    }, [data, dispatch])
    if(isLoading) return <Loading/>
    return (
        <div className="w-full h-[85vh] flex flex-col flex-wrap gap-1 p-[2%]">
            {
                cartItems.length == 0 ? "" : (
                    cartItems.map(item => (
                        <div key={item._id} className="w-full md:w-96 h-max flex flex-row items-center gap-3 shadow rounded-lg p-1">
                            <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.image}`} alt={item.name} className="w-32 h-20"/>
                            <div className="w-3/5 flex flex-col gap-1">
                                <div className="w-full h-max flex flex-row items-center justify-between">
                                    <span className="font-bold text-md">{item.name}</span>
                                    <span className="text-[#666]">{item.price}$</span>
                                </div>
                                <div className="w-full h-max flex flex-row items-center justify-between">
                                    <span>{item.quantity}</span>
                                    <div className="w-max flex flex-row gap-1 items-center">
                                        <IncreaseCartItem userId={userId != undefined ? userId: ""} name={item.name}/>
                                        <DecreaseCartItem userId={userId != undefined ? userId: ""} name={item.name}/>
                                        <RemoveCartItem userId={userId != undefined ? userId: ""} name={item.name}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}