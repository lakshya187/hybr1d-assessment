import { RequestHandler } from "express";
import { Service } from "../../interfaces/services";
import userRepository from "../../repositories/user.repository";
import { hash } from "bcryptjs";
import { UserType } from "../../types/user";
import CustomError from "../../utility/error";

class CreateUserService implements Service {
  execute: RequestHandler = async (req, res, next) => {
    try {
      const { name, email, password, userType } = req.body;
      // 12 is the salt value
      const userTypes: UserType[] = ["BUYER", "SELLER"];
      if (!userTypes.includes(userType)) {
        throw new CustomError(400, "user type is not valid");
      }
      const encrypedPassword = await hash(password, 12);
      const user = await userRepository.createUser({
        email,
        name,
        password: encrypedPassword,
        userType,
      });
      res.status(201).json({
        message: "success",
        user,
      });
    } catch (e: any) {
      next(e);
    }
  };
}
export default new CreateUserService();
