import db from "../config/database/prisma";
import { userQueryableFields, userType } from "../types/user";
import CustomError from "../utility/error";

class UserRepository {
  createUser = async (user: userType) => {
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
    queryField: userQueryableFields,
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
  findUsersWithParam = async (
    queryField: userQueryableFields,
    queryValue: string
  ) => {
    try {
      return await db.user.findMany({
        where: {
          [queryField]: queryValue,
        },
      });
    } catch (e) {
      throw e;
    }
  };
}

export default new UserRepository();
