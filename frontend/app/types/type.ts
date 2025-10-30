export type product = {
    _id: string;
    title: string;
    explain: string;
    image: string;
    imageUrl?: string;
    price: number;
    rate: number;
    category: string;
}

export type ProductTypeGet = {
    id: string;
    // _id: string;
    title: string;
    explain: string;
    price: number;
    rate: number;
    image: string;
    imageUrl: string;
    category: string;
}
export type CartItem = {
    _id: string;
    name: string;
    image: string;
    imageUrl: string;
    price: number;
    quantity: number;
}