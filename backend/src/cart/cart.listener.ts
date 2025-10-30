import { Injectable } from "@nestjs/common";
import { CartService } from "./cart.service";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class CartListener {
    constructor(private cartService:CartService){}

    @OnEvent('user.created')
    async handleUserCreated(payload : {userId: string}) {
        const existingCart = await this.cartService.userCart(payload.userId).catch(() => null)
        if(!existingCart) {
            await this.cartService.create({userId: payload.userId, items: []})
        }
    }
}