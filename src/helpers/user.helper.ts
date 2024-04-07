import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

class UserHelper {
  generateToken = (id: number) => {
    return sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  checkPasswords = async (userPassword: string, reqPassword: string) => {
    return await compare(reqPassword, userPassword);
  };
}

export default new UserHelper();
