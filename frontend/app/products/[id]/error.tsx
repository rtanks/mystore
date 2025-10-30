'use client'

import { useEffect } from "react"

export default function Error({error}: {error: Error}){
    useEffect(() => {
        console.log(error)
    } , [error])
    return(
        <div className="w-full h-[80vh] flex justify-center items-center">
            <div className="w-max text-[#c00]">
                Error on receive product data! 
            </div>
        </div>
    )
}