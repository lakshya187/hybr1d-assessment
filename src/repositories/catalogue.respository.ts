import { Catalogue, User } from "@prisma/client";
import db from "../config/database/prisma";
import CustomError from "../utility/error";
// import { UserCreateOneWithoutCatalogueInput } from "@prisma/client";

class CatalogueRepository {
  createCatalogue = async (user: User): Promise<Catalogue> => {
    try {
      return await db.catalogue.create({
        data: {
          User: {
            connect: { id: user.id },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new CustomError(500, "Failed to create catalogue");
    }
  };
}

export default new CatalogueRepository();
