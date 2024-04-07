import { RequestHandler } from "express";
import { decode } from "punycode";
import userHelper from "../helpers/user.helper";
import userRepository from "../repositories/user.repository";
import CustomError from "../utility/error";
import { userType } from "../types/user";
import { User } from "@prisma/client";

class AuthMiddleware {
  execute: RequestHandler = async (req, res, next) => {
    try {
      // 1) Checking if the token is present insdie the header
      let token = "";
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) {
        throw new CustomError(401, "You should login first");
      }
      //2) Validating the token
      const decodedToken = userHelper.verifyToken(token);
      const currentUser = await userRepository.findUserWithParam(
        "id",
        decodedToken.id
      );
      if (!currentUser) {
        throw new CustomError(403, "User does not exists");
      }
      // adding the user as an object on the request.
      req["user"] = currentUser as User;
      next();
    } catch (err: any) {
      res.status(err.statusCode || 500).json({
        message: err.message || "something went wrong",
        success: false,
      });
    }
  };
}
export default new AuthMiddleware();
