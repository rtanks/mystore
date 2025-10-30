import { IoCallOutline } from "react-icons/io5";

export default function Footer() {
    return (
        <footer className="w-full h-32 p-5 bg-[#1a1a1a] flex flex-col gap-1 items-center justify-center text-center text-white text-sm">
          <address>
            Address :
            Lorem ipsum-dolor sit-amet consectetur<br/>
            adipisicing elit. Expedita saepe minima 
          </address>
          <div className="w-max flex flex-row items-center gap-1">
            <IoCallOutline size={16}/>
            <span>099-xxx-xxx-xx</span>
          </div>
        </footer>
    )
}