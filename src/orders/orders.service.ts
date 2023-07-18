import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {CreateOrderDto} from "./dto/create-order.dto";
import {Order} from "./models/order.model";
@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order)
        private readonly orderModel: typeof Order,
    ) {}

     create(createOrderDto: CreateOrderDto): Promise<Order> {
         return this.orderModel.create({
             userId: createOrderDto.userId,
             cartId: createOrderDto.cartId,
             price: createOrderDto.price

         });
       }

    async findAll(): Promise<Order[]> {
        return this.orderModel.findAll();
    }

    findOne(id: string): Promise<Order> {
        return this.orderModel.findOne({
            where: {
                id,
            },

        });
    }

    async remove(id: string): Promise<void> {
        const order = await this.findOne(id);
        await order.destroy();
    }
}
