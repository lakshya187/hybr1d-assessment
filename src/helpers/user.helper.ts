import { sign, verify } from "jsonwebtoken";
import { compare } from "bcryptjs";
import CustomError from "../utility/error";

class UserHelper {
  generateToken = (id: number) => {
    return sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  checkPasswords = async (userPassword: string, reqPassword: string) => {
    return await compare(reqPassword, userPassword);
  };
  verifyToken = (token: string) => {
    let decodedToken: any = {};
    verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        console.log(err);
        throw new CustomError(
          401,
          "Could not verify the token. Please login again."
        );
      }
      decodedToken = decoded;
    });
    return decodedToken;
  };
}

export default new UserHelper();
