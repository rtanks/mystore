type InpProps = {
    type: string;
    register?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function Input({type, register, onChange, placeholder}:InpProps) {
    return(
        <input type={type} {...register} placeholder={placeholder} onChange={onChange} 
            className="w-full h-12 p-2 border-2 border-[#ddd] rounded-lg"/>
    )
}