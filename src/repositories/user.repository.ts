import db from "../config/database/prisma";
import { queryableFields, userInput } from "../types/user";
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
  findUserWithParam = async (
    queryField: queryableFields,
    queryValue: string
  ) => {
    try {
      const user = await db.user.findFirst({
        where: {
          [queryField]: queryValue,
        },
      });
      return user;
    } catch (e) {
      throw e;
    }
  };
}

export default new UserRepository();
