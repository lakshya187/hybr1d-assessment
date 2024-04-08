export type userRole = "BUYER" | "SELLER";
export type userType = {
  name: string;
  email: string;
  password: string;
  userType: userRole;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  catalogueId?: number;
};

export type userQueryableFields = "email" | "id" | "catalogueId" | "userType";
