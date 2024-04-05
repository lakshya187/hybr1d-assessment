import db from "../config/database/prisma";
import { userInput } from "../types/user";
import CustomError from "../utility/error";

class UserRepository {
  createUser = async (user: userInput) => {
    try {
      const existingUser = await db.user.findFirst({
        where: {
          email: user.email,
        },
      });
      if (existingUser) {
        throw new CustomError(
          400,
          `A user already exists with the email ${user.email}`
        );
      }
      return await db.user.create({ data: user });
    } catch (e: any) {
      throw e;
    }
  };
}

export default new UserRepository();
