import { Order } from "@prisma/client";
import db from "../config/database/prisma";

class OrderRepository {
  createOrder = async (order: Order) => {
    try {
      const createdOrder = await db.order.create({
        data: {
          buyer: { connect: { id: order.buyerId } },
          seller: { connect: { id: order.sellerId } },
          amount: order.amount,
        },
      });
      return createdOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };
}

export default new OrderRepository();
