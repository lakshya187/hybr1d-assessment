import { RequestHandler } from "express";
import { Service } from "../../../interfaces/services";
import CustomError from "../../../utility/error";
import orderRepository from "../../../repositories/order.repository";
import productsRepository from "../../../repositories/products.repository";
import { Order, OrderProducts, Product } from "@prisma/client";
import orderProductRepository from "../../../repositories/orderProduct.repository";
import userRepository from "../../../repositories/user.repository";

class CreateOrderService implements Service {
  execute: RequestHandler = async (req, res, next) => {
    try {
      const {
        productIds,
        buyerId,
      }: { productIds: number[]; sellerId: number; buyerId: number } = req.body;
      const { sellerId } = req.params;

      if (!productIds) {
        throw new CustomError(400, "No products selected");
      }
      if (!sellerId || !parseInt(sellerId)) {
        throw new CustomError(400, "No seller provided");
      }
      if (!buyerId) {
        throw new CustomError(400, "No buyer provided");
      }
      const buyer = await userRepository.findUserWithParam("id", +buyerId);
      if (!buyer) {
        throw new CustomError(400, `No buyer exists with id ${buyerId}`);
      }
      const seller = await userRepository.findUserWithParam("id", +sellerId);
      if (!seller) {
        throw new CustomError(400, `No seller exists with id ${sellerId}`);
      }
      const products = await productsRepository.findMultipleProducts(
        productIds
      );
      this.checkIfProductsBelongToSeller(
        seller.catalogueId as number,
        products
      );

      const amount = products.reduce((acc, currentValue) => {
        return (acc += currentValue.price);
      }, 0);

      const orderObj = { amount, buyerId, sellerId: +sellerId };
      const createdOrder = await orderRepository.createOrder(orderObj as Order);
      const orderProducts = await orderProductRepository.createOrderProduct(
        productIds,
        createdOrder.id
      );
      console.log(orderProducts);
      res.status(201).json({
        message: "order created successfully",
      });
    } catch (e) {
      next(e);
    }
  };
  private checkIfProductsBelongToSeller = (
    catalogueId: number,
    products: Product[]
  ) => {
    products.forEach((product) => {
      if (product.catalogueId !== catalogueId) {
        throw new CustomError(
          400,
          `Product with id ${product.id} does not belong the seller.`
        );
      }
    });
  };
}

export default new CreateOrderService();
