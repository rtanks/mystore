export const GET = async (request: Request, context: {
    params: {
        id: string,
    }
}) => {
    const {id} = await context.params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`)
    return response;
}