import Link from "next/link";
import { CiStar } from "react-icons/ci";
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
export default async function Products() {
    const response = await fetch(`${process.env.BASE_URL_CURRENT}/api/products`);
    const productsList: ProductType[] = await response.json()
    
    console.log(productsList)
    return (
        <div className="w-full h-screen overflow-y-scroll flex flex-col items-center md:items-start md:justify-center sm:flex-row sm:flex-wrap gap-0.5 px-5 mb-10">
            {
                productsList.map(product => (
                    <Link href={`products/${product.id}`} key={product.id} className="w-68 h-96 p-3 flex flex-col gap-3 bg-white shadow-sm">
                      <img src={product.imageUrl} className="w-full h-2/4"/>
                      <div className="w-full h-2/4 flex flex-col gap-1 relative">
                        <div role="title" className="font-bold text-md line-clamp-2">{product.title}</div>
                        <p className="text-sm text-[#666] line-clamp-3">{product.explain}</p>
                        <div className="w-full h-10 flex flex-row justify-between products-center absolute left-0 bottom-0">
                          <span>{product.price}$</span>
                          <span className="w-max flex flex-row products-center gap-0.5 text-[#db0]">
                            <CiStar size={21}/>
                            <span>{product.rate}</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                ))
            }
            
        </div>
    )
}