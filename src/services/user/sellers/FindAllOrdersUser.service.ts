import { RequestHandler } from "express";
import { Service } from "../../../interfaces/services";
import db from "../../../config/database/prisma";
import userRepository from "../../../repositories/user.repository";
import CustomError from "../../../utility/error";

class FindAllOrdersService implements Service {
  execute: RequestHandler = async (req, res, next) => {
    try {
      const { sellerId } = req.params;
      if (!sellerId || !parseInt(sellerId)) {
        throw new CustomError(400, "The seller id is invalid");
      }
      const data = await userRepository.findUserSellerOrdersWithProducts(
        +sellerId
      );
      res.status(200).json({ success: true, data });
    } catch (e) {
      next(e);
    }
  };
}

export default new FindAllOrdersService();
