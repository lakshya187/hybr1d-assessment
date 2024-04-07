import { Product } from "@prisma/client";
import db from "../config/database/prisma";
import CustomError from "../utility/error";

class ProductRepository {
  createProducts = async (products: Product[], catalogueId: number) => {
    try {
      return await db.product.createMany({
        data: products.map((product) => ({
          ...product,
          catalogueId: catalogueId,
        })),
      });
    } catch (e) {
      console.log(e);
      throw new CustomError(500, "Could not create products ");
    }
  };
}
export default new ProductRepository();
