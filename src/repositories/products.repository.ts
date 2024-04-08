import { Product } from "@prisma/client";
import db from "../config/database/prisma";
import CustomError from "../utility/error";
import { productQueryAbleFields } from "../types/products";

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
  findProductsWithParams = async (userId: number) => {
    try {
      const userWithProducts = await db.user.findUnique({
        where: { id: userId },
        include: {
          catalogue: {
            include: {
              Product: true,
            },
          },
        },
      });
      return userWithProducts?.catalogue?.Product;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
export default new ProductRepository();
