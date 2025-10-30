'use client'
import { CartItem, ProductTypeGet } from "@/app/types/type"
import Cookies from 'js-cookie'
import { useEffect, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import {motion} from 'framer-motion'
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/app/store"
import { setTotalQuantity } from "@/app/store/slices/cartSlice"

export  default function AddToCartButton(props:{
    product: ProductTypeGet
}) {
    const [notLogin, setNotLogin] = useState<Boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const addToCart = async () => {
        const userId = Cookies.get('userId')
        console.log(userId)
        if(userId == undefined || userId == '') {
            setNotLogin(true);
        } else {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/${userId}/items/add`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: props.product.title, image: props.product.image, price: props.product.price})
                
            })
            const cart = await response.json()
            const items:CartItem[] = cart.items;
            const total = items.reduce((sum, item) => sum + item.quantity,0)
            dispatch(setTotalQuantity({total: total}));
            console.log(items);
        }
        
    }
    useEffect(() => {
        const setTime = setTimeout(() => {
            setNotLogin(false);
        }, 3000);
        return () => clearTimeout(setTime)
    }, [notLogin])
    return (
        <Fragment>
            <button onClick={addToCart} type="button" className={`bg-[#c00] text-white absolute right-0 -top-5 
                w-10 h-max py-6 after:contents-[""] after:border-t-20 after:border-l-20 
                after:border-r-20 after:border-t-[#c00] after:border-l-transparent after:border-r-transparent after:absolute after:-bottom-5
                after:left-0
                `}>Add To Cart</button>
                {notLogin && (<div className="w-64 text-center h-max bg-[#d20] rounded-lg overflow-hidden flex flex-col fixed left-5 top-32">
                        <div className="text-white py-3 w-full h-max">you must login</div>
                        <motion.div animate={{scaleX: [0,1], transition: {duration: 3}}} 
                        className="bg-[#fff5] h-2 w-full origin-left"></motion.div>
                    </div>)}
        </Fragment>
    )
}