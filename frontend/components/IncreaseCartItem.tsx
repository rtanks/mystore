'use client'
import { useQueryClient } from "@tanstack/react-query";
import { PiPlusBold } from "react-icons/pi";


export default function IncreaseCartItem({userId, name}:{userId:string, name:string}) {
    const queryClient = useQueryClient();
    const increaseItem = async() => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/${userId}/items/increase`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name })
            })
            console.log(await response.json())
            queryClient.invalidateQueries({queryKey: ['cartItems']})
        } catch(error) {
            console.log(error);
            return error;
        }
    }
    return (
        <button onClick={increaseItem} className="bg-white text-[#666] px-2 py-1 border border-[#666] rounded-lg">
            <PiPlusBold/>
        </button>
    )
}