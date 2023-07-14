import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateCartDto} from './dto/create-cart.dto';
import {Cart} from './models/cart.model';
import {CartProducts} from "./models/cart-products.model";

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart) private readonly cartModel: typeof Cart,
        @InjectModel(CartProducts) private readonly cartProductsModel: typeof CartProducts,
    ) {
    }

    async create(model: CreateCartDto): Promise<Cart> {
        const cart = await this.cartModel.create({
            totalPrice: model.totalPrice,
        });

        model.productIds.map(async item => {
            console.log('productId', item);
             await this.cartProductsModel.create({
                cartId: cart.id,
                productId: 2
            });

        });

        return cart;
    }

    async findAll(): Promise<Cart[]> {
        return this.cartModel.findAll();
    }

    findOne(id: string): Promise<Cart> {
        return this.cartModel.findOne({
            where: {
                id,
            },
            include: ['products'],

        });
    }

    async remove(id: string): Promise<void> {
        const cart = await this.findOne(id);
        await cart.destroy();
    }
}
