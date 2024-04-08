import { RequestHandler } from "express";
import { Service } from "../../../interfaces/services";
import CustomError from "../../../utility/error";
import catalogueRespository from "../../../repositories/catalogue.respository";
import productsRepository from "../../../repositories/products.repository";
import { Product } from "@prisma/client";
import userRepository from "../../../repositories/user.repository";

class CreateCatalogueService implements Service {
  execute: RequestHandler = async (req, res, next) => {
    try {
      const { products, sellerId }: { products: Product[]; sellerId: number } =
        req.body;

      const user = await userRepository.findUserWithParam("id", sellerId);

      if (!user) {
        throw new CustomError(400, "The seller does not exists");
      }
      if (user.userType !== "SELLER") {
        throw new CustomError(
          403,
          "This user is not authorized to perfom this action"
        );
      }
      if (user.catalogueId) {
        throw new CustomError(400, "You cannot have multiple catalogues");
      }
      if (!products) {
        throw new CustomError(400, "No products provided");
      }

      const areProductsValid = this.validateProducts(products);
      if (!areProductsValid) {
        throw new CustomError(400, "Products are not valid.");
      }
      const catalogue = await catalogueRespository.createCatalogue(user);
      await productsRepository.createProducts(products, catalogue.id);
      res.status(201).json({
        message: "created catalogue",
        success: true,
      });
    } catch (e) {
      next(e);
    }
  };
  private validateProducts = (products: Product[]) => {
    let valid = true;
    products.forEach((p) => {
      if (!p || !p.name || !p.price) {
        valid = false;
      }
    });

    return valid;
  };
}
export default new CreateCatalogueService();
