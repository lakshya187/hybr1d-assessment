import { RequestHandler } from "express";
import { Service } from "../../interfaces/services";
import CustomError from "../../utility/error";
import userHelper from "../../helpers/user.helper";
import userRepository from "../../repositories/user.repository";

class LoginUserService implements Service {
  execute: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw new CustomError(400, "No email provided");
      }
      if (!password) {
        throw new CustomError(400, "No password provided");
      }
      const doesUserExists = await userRepository.findUserWithParam(
        "email",
        email
      );
      if (!doesUserExists) {
        throw new CustomError(400, "No user exists with email " + email);
      }
      const doesPasswordMatch = await userHelper.checkPasswords(
        doesUserExists.password,
        password
      );
      if (!doesPasswordMatch) {
        throw new CustomError(400, "Passwords dont match");
      }
      const token = userHelper.generateToken(doesUserExists.id);
      res.status(200).json({
        token: token,
        success: true,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default new LoginUserService();
