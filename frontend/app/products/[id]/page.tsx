// 'use client'
import AddToCartButton from "@/components/AddToCartButton"
import { CiStar } from "react-icons/ci"

interface Product {
    params: {
        id: string
    }
    searchParams ?: {[key: string]:string | string[] | undefined}
}

type ProductType = {
    id: string;
    // _id: string;
    title: string;
    explain: string;
    price: number;
    rate: number;
    image: string;
    imageUrl: string;
    category: string;
}
export default async function Product(props:{
    params :{
        id: string
    }
}) {
    const {id} = await props.params;
    const response = await fetch(`${process.env.BASE_URL_CURRENT}/api/products/${id}`);
    const {product} = await response.json();
    
    console.log(product)
    return (
        <div className="w-full h-[85vh] flex justify-center items-center">
            <div className="w-[90%] md:w-3/5 h-max md:h-4/5 shadow-md shadow-[#0004] flex flex-col-reverse md:flex-row gap-5 p-5 rounded-lg overflow-hidden">
                <div className="w-full md:w-1/2 h-full relative">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-[#666] mt-3">{product.explain}</p>
                    <div className="w-full flex flex-row py-3 justify-between items-center static md:absolute left-0 bottom-0">
                        <span>{product.price}$</span>
                        <div className="flex flex-row items-center gap-0.5 text-[#dd0]">
                            <CiStar size={22}/>
                            <span>{product.rate}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 h-full relative">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-max"/>
                    <AddToCartButton product={product}/>
                </div>
            </div>
        </div>
    )
}