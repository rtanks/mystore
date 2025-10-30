'use client'
import { useQueryClient } from "@tanstack/react-query";
import { TbTrash } from "react-icons/tb";

export default function RemoveCartItem({userId, name}:{userId:string, name:string}) {
    const queryClient = useQueryClient();
    const removeItem = async() => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/${userId}/items/${name}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                console.log(await response.json())
                queryClient.invalidateQueries({queryKey: ['cartItems']})
            } catch(error) {
                console.log(error);
                return error;
            }
        }
    return (
        <button onClick={removeItem} className="bg-white text-[#666] px-2 py-0.5 border border-[#666] rounded-lg">
            <TbTrash size={19}/>
        </button>
    )
}