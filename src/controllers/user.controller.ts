import { Router } from "express";
import CreateUserService from "../services/user/CreateUser.service";
import LoginUserService from "../services/user/LoginUser.service";
import authMiddleware from "../middlewares/auth.middleware";
import FindAllSellersService from "../services/user/sellers/FindAllSellers.service";
import FindCatalogueSellerService from "../services/user/sellers/FindCatalogueSeller.service";

const router = Router();

router.post("/", CreateUserService.execute);
router.post("/login", LoginUserService.execute);
router.get("/sellers", authMiddleware.execute, FindAllSellersService.execute);
router.get(
  "/sellers/:sellerId",
  authMiddleware.execute,
  FindCatalogueSellerService.execute
);
export default router;
