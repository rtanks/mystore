'use client'
import Input from '../../../components/Input'
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { submitForm } from './action';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const schema = z.object({
    userName: z.string().nonempty('this field is requirement!'),
    email: z.email('Email is invalid!').nonempty('this field is requirement!'),
    phoneNumber: z.string().nonempty('this field is requirement'),
    password: z.string().nonempty("this field is requirement"),
    confirmPassword: z.string().nonempty("this field is requirement"),
}).refine(data => data.password === data.confirmPassword, {message: "the entered password is incorrect!", path: ["password"]})

type FormValues = z.infer<typeof schema>

export default function Register() {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            userName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: ""
        }
    })
    
    const route = useRouter();
    const addUser = async (data: FormValues) => {
        console.log(data)
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        })

        const result = await submitForm(formData);
        console.log(result)
        route.push('/login')
    }
    return(
        <div className="w-full h-[90vh] sm:h-[85vh] flex justify-center items-center overflow-y-scroll mb-10 md:mb-0">
            <div className="relative w-[95%] sm:w-3/6 h-[98%] sm:h-[95%] flex flex-col sm:flex-row shadow-lg rounded-2xl sm:overflow-hidden bg-white">
                <img src='/image/car.jpg' alt="logo" className="w-full hidden sm:block sm:w-1/2 h-[47vh] sm:h-full rounded-l-lg "/>
                <img src='/image/car2.jpg' alt="logo" className="w-full block sm:hidden h-full rounded-lg sm:rounded-t-0"/>
                <div className="w-full sm:w-1/2 h-[77%] sm:h-full rounded-lg sm:rounded-r-lg mt-1 flex flex-col items-center justify-center gap-2 sm:gap-5 absolute left-0 top-[23%] bg-white sm:static ">
                    <div className="text-center font-bold text-3xl w-full h-max pt-3">MYSTORE</div>
                    <form onSubmit={handleSubmit(addUser)} className='w-4/5 h-max flex flex-col gap-2'>
                        <Input register={register("userName")} type={'text'}  placeholder='Enter your username...'/>
                        {errors.userName && <p className='text-[#f00] text-sm'>{errors.userName.message}</p>}
                        <Input register={register("email")} type={'text'}  placeholder='Enter your email...'/>
                        {errors.email && <p className='text-[#f00] text-sm'>{errors.email.message}</p>}
                        <Input register={register("phoneNumber")} type={'text'}  placeholder='Enter your phone number...'/>
                        {errors.phoneNumber && <p className='text-[#f00] text-sm'>{errors.phoneNumber.message}</p>}
                        <Input register={register("password")} type={'password'}  placeholder='Enter your password...'/>
                        {errors.password && <p className='text-[#f00] text-sm'>{errors.password.message}</p>}
                        <Input register={register("confirmPassword")} type={'password'}  placeholder='Confirm password...'/>
                        {errors.confirmPassword && <p className='text-[#f00] text-sm'>{errors.confirmPassword.message}</p>}
                        <button type='submit' className='w-full bg-[#d20] hover:bg-[#a20] hover:cursor-pointer text-white py-2.5 rounded-lg mt-5'>{isSubmitting ? "is sending information...": "Signup"}</button>
                    </form>
                    <div className='w-4/5 text-sm text-zinc-500'>if you have an account you can signin</div>
                    <Link href={"/login"} className='w-4/5 h-max text-[#802] text-center border py-2'>Signin</Link>
                </div>
            </div>
        </div>
    )
}