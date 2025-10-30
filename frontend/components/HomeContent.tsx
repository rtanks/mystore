import { useRouter } from "next/navigation"

export default function HomeContent() {
    const route = useRouter();
    return (
        <div className="w-full h-[85vh] overflow-y-scroll flex flex-col bg-white items-center justify-center gap-5 px-[5%] md:py-[2%] mb-10 md:mb-0">
          <div className="w-full h-full overflow-y-scroll flex flex-col-reverse md:flex-row bg-white items-center md:justify-center md:gap-5 md:px-[5%]">

            <div className="w-full md:w-[45%] h-max md:h-full flex flex-col gap-2.5 p-5">
              <h1 className="w-full md:w-3/4 h-max text-[1.4rem] block sm:text-4xl font-bold md:mt-5">HELLO WELCOME TO MYSTORE!</h1>
              <p className="w-[90%] h-max pl-1 text-zinc-700 text-sm sm:text-md mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <button type="button" onClick={() => route.push("/products")}  
                className="w-72 bg-[#c00] border-0 text-white py-2 rounded-3xl mt-8">See Products</button>
            </div>

            <div className="w-full md:w-[55%] h-max md:h-full flex justify-center">
              <img src='/image/bg-transparent.png' alt="main pic" className="w-full md:w-[650px] h-max md:h-[500px]"/>
            </div>

          </div>
        </div>
    )
}