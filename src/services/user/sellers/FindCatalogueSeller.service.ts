import { RequestHandler } from "express";
import { Service } from "../../../interfaces/services";
import productsRepository from "../../../repositories/products.repository";

class FindCatalogueSellerService implements Service {
  execute: RequestHandler = async (req, res, next) => {
    try {
      const { sellerId } = req.params;

      const data = await productsRepository.findProductsWithParams(+sellerId);

      res.status(200).json({
        message: "success",
        data,
      });
    } catch (e) {
      next(e);
    }
  };
}
export default new FindCatalogueSellerService();
