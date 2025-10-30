export const submitForm = async (data:FormData) => {
    const email = data.get('email');
    const phoneNumber = data.get('phoneNumber');
    const password = data.get('password');
    const userName = data.get('userName');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({ userName, email, password, phoneNumber })
    })

    if(!response.ok) {
        throw new Error('Failed to signup');
    }

    const user = await response.json();
    console.log(user)
    return user;
}