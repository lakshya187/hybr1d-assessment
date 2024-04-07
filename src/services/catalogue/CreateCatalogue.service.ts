import { RequestHandler } from "express";
import { Service } from "../../interfaces/services";
import { product } from "../../types/products";
import CustomError from "../../utility/error";
import catalogueRespository from "../../repositories/catalogue.respository";
import productsRepository from "../../repositories/products.repository";
import { Product } from "@prisma/client";

class CreateCatalogueService implements Service {
  execute: RequestHandler = async (req, res, next) => {
    try {
      const { products }: { products: Product[] } = req.body;
      if (req.user?.userType === "BUYER") {
        throw new CustomError(
          403,
          "You are not allowed to perform this action"
        );
      }
      if (req.user?.catalogueId) {
        throw new CustomError(400, "You cannot have multiple catalogues");
      }
      if (!products) {
        throw new CustomError(400, "No products provided");
      }
      const areProductsValid = this.validateProducts(products);
      if (!areProductsValid) {
        throw new CustomError(400, "Products are not valid.");
      }

      const catalogue = await catalogueRespository.createCatalogue(req.user!);
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
