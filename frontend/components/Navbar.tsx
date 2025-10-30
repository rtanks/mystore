'use client'
import Link from "next/link";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import {motion, useAnimation} from "framer-motion";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/app/store";
import { getUserId } from "@/app/store/slices/loginSlice";
import { getTotalQuantity } from "@/app/store/slices/cartSlice";

export default function Navbar() {
  const [userInfo, setUSerInfo] = useState<Boolean>(false)
  const route = useRouter();
  const userId = useSelector((state: AppState) => state.login.userId)
  const totalItem = useSelector((state: AppState) => state.cart.totalQuantity)
  const dispatch = useDispatch<AppDispatch>();
  const controller = useAnimation();

  useEffect(() => {
    let userLogin = Cookies.get('userId');
    console.log(userLogin)
    if(userLogin != undefined && userLogin != '') {
      dispatch(getUserId({id: userLogin}));
    }
    
    let total = Cookies.get('totalItem');
    console.log(total)
    if(total != undefined && total != '') {
      console.log(+total)
      dispatch(getTotalQuantity({total: +total}));
    }
    controller.start({
      top: [-10, 17], 
      transition: {duration: 0.7}
    })
    },[dispatch,totalItem])

  const onClick = () => {
    Cookies.remove('userId');
    dispatch(getUserId({id: ''}));
    route.push('/')
  }
    return (
        <nav className="w-full h-20 bg-white mb-4 flex flex-row gap-4 items-center justify-between px-5 sticky left-0 top-0 z-50 shadow-md">
          <Link href={'/'} className="w-36 h-20 relative" >
           <img src='/image/logo-black.png' alt="logo" className="w-full h-full -rotate-90 absolute -left-9 top-7.5" />
          </Link>
          <div className="w-max h-max flex flex-row items-center gap-3">
            <Link href={'/cart'} className="w-12 h-14 relative flex items-center justify-center">
              <CiShoppingCart size={45}/>
              <motion.div className="absolute top-[30%] text-[#c00]" 
              // animate={{top: [-10, 0, 17], transition: {duration: 1}}}
              animate={controller}
              >{totalItem}</motion.div>
            </Link>
            {
              (userId == undefined || userId == '')? (
                <div className="w-20 h-max flex flex-col items-center text-md">
                  <Link href='/register' className="text-[#aaa] text-sm w-full hover:text-[#d20] hover:scale-125">Signup</Link>
                  <span className="text-xs leading-1.5">or</span>
                  <Link href='/login' className="w-full text-center hover:text-[#d20] hover:scale-115">Signin</Link>
                </div>
              ) : (
                <div onClick={() => setUSerInfo(prev => !prev)} className="w-10 h-10 bg-[#025] rounded-full flex justify-center items-center relative">
                  <CiUser size={28} color="#fff"/>
                  {
                    (userInfo == true)? (
                      <div onClick={onClick} className="w-52 h-max absolute -bottom-20 right-0 flex flex-row items-center gap-1 p-5 rounded-lg bg-white shadow-lg">
                        <LuLogOut/>
                        <span className="text-sm">Logout</span>
                      </div>
                    ): ""
                  }
                </div>
              )
            }
          </div>
        </nav>
    )
}