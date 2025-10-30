"use server"
export const submitForm = async (data: FormData) => {
    const email = data.get('email');
    const password = data.get('password')

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({ email, password })
    } );
    
    if(!response.ok) {
        console.log(response)
        throw new Error('login failed!')
    }

    const user = await response.json();
    console.log(user);
    return user
}