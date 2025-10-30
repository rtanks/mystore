'use client'

import Link from 'next/link';
import Input from '../../../components/Input'
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { submitForm } from './action';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { getUserId } from '@/app/store/slices/loginSlice';

const schema = z.object({
    email: z.email('invalid email').nonempty("This field is requirement!"),
    password: z.string().nonempty("This field is requirement!")
})
type FormValues = z.infer<typeof schema>

export default function Login() {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const route = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const loginUser = async (data: FormValues) => {
       console.log(data)

       const formData = new FormData();
       Object.entries(data).forEach(([key, value]) => formData.append(key,value));

       console.log(formData);

       const result = await submitForm(formData);
       
       console.log(result._doc._id)
       Cookies.set("userId", result._doc._id)
       dispatch(getUserId({id: result._doc._id}))
       route.push('/products')
    }
    return(
        <div className="w-full h-[85vh] flex justify-center items-center overflow-y-scroll">
            <div className="relative w-[95%] sm:w-3/6 h-[98%] flex flex-col sm:flex-row shadow-lg rounded-2xl sm:overflow-hidden bg-white">
                <img src='/image/car.jpg' alt="logo" className="w-full hidden sm:block sm:w-1/2 h-[47vh] sm:h-full rounded-lg sm:rounded-t-0"/>
                <img src='/image/car2.jpg' alt="logo" className="w-full block sm:hidden h-full rounded-lg sm:rounded-t-0"/>
                <div className="w-full sm:w-1/2 h-[61.62%] sm:h-full rounded-lg sm:rounded-r-lg mt-5 flex flex-col items-center justify-center gap-2 sm:gap-5 absolute left-0 top-[35%] bg-white sm:static ">
                    <div className="text-center font-bold text-3xl w-full h-max pt-4 sm:pt-5">MYSTORE</div>
                    <form onSubmit={handleSubmit(loginUser)} className='w-4/5 h-max flex flex-col gap-2'>
                        <Input type={'text'} register={register('email')} placeholder='Enter your email...'/>
                        {errors.email && <p className='text-[#f00] text-sm'>{errors.email?.message}</p>}
                        <Input type={'password'} register={register('password')} placeholder='Enter your password...'/>
                        {errors.password && <p className='text-[#f00] text-sm'>{errors.password?.message}</p>}
                        <button type='submit' className='w-full bg-[#d20] hover:bg-[#a20] hover:cursor-pointer text-white py-2.5 rounded-lg mt-3 sm:mt-6'>{isSubmitting ? "is sending information...": "Signin"}</button>
                    </form>
                    <div className='w-4/5 text-sm px-1 text-zinc-400'>If you don't have a account, you can create an account</div>
                    <Link href={'/register'} className='w-4/5 h-max text-[#802] border text-center bg-white py-2 '>Create Account</Link>
                </div>
            </div>
        </div>
    )
}