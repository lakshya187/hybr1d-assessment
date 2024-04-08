import { RequestHandler } from "express";
import { Service } from "../../../interfaces/services";
import userRepository from "../../../repositories/user.repository";

class FindAllSellersService implements Service {
  execute: RequestHandler = async (req, res, next) => {
    try {
      const data = await userRepository.findUsersWithParam(
        "userType",
        "SELLER"
      );

      res.status(200).json({
        success: true,
        data,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default new FindAllSellersService();
