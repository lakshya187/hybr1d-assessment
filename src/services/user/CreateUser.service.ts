import { RequestHandler } from "express";
import { Service } from "../../interfaces/services";
import userRepository from "../../repositories/user.repository";
import { hash } from "bcryptjs";
import { UserType } from "../../types/user";
import CustomError from "../../utility/error";
import userHelper from "../../helpers/user.helper";

class CreateUserService implements Service {
  execute: RequestHandler = async (req, res, next) => {
    try {
      const { name, email, password, userType } = req.body;
      const userTypes: UserType[] = ["BUYER", "SELLER"];
      if (!userTypes.includes(userType)) {
        throw new CustomError(400, "user type is not valid");
      }
      if (!name) {
        throw new CustomError(400, "No name provided");
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!email) {
        throw new CustomError(400, "No email provided");
      }
      if (!emailRegex.test(email)) {
        throw new CustomError(400, "Email is not valid");
      }
      if (!password) {
        throw new CustomError(400, "No password provided");
      }
      const encrypedPassword = await hash(password, 12);
      const user = await userRepository.createUser({
        email,
        name,
        password: encrypedPassword,
        userType,
      });
      const token = userHelper.generateToken(user.id);
      res.status(201).json({
        message: "success",
        user,
        token,
      });
    } catch (e: any) {
      next(e);
    }
  };
}
export default new CreateUserService();
