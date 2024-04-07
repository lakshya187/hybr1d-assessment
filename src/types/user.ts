export type UserType = "BUYER" | "SELLER";
export type userInput = {
  name: string;
  email: string;
  password: string;
  userType: UserType;
};

export type queryableFields = "email" | "id";
