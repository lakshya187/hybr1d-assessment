import db from "../config/database/prisma";

class OrderProductRepository {
  createOrderProduct = async (productIds: number[], orderId: number) => {
    // order
    return await db.orderProducts.createMany({
      data: productIds.map((p) => {
        return { productId: p, orderId };
      }),
    });
  };
}

export default new OrderProductRepository();
