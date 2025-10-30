import { NextResponse } from "next/server";

export const GET = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`)
    return response;
}