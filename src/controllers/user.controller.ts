import { Router } from "express";
import CreateUserService from "../services/user/CreateUser.service";
import LoginUserService from "../services/user/LoginUser.service";
import authMiddleware from "../middlewares/auth.middleware";
import FindAllSellersService from "../services/user/sellers/FindAllSellers.service";
import FindCatalogueSellerService from "../services/user/sellers/FindCatalogueSeller.service";
import CreateOrderService from "../services/user/buyers/CreateOrder.service";
import FindAllOrdersUserService from "../services/user/sellers/FindAllOrdersUser.service";
import CreateCatalogueService from "../services/user/sellers/CreateCatalogue.service";

const router = Router();

router.post("/signup", CreateUserService.execute);
router.post("/login", LoginUserService.execute);
router.get(
  "/buyer/list-of-sellers",
  authMiddleware.execute,
  FindAllSellersService.execute
);
router.get(
  "/buyer/seller-catalog/:sellerId",
  authMiddleware.execute,
  FindCatalogueSellerService.execute
);
router.post(
  "/seller/create-catalog",
  authMiddleware.execute,
  CreateCatalogueService.execute
);
router.post(
  "/buyer/create-order/:sellerId",
  authMiddleware.execute,
  CreateOrderService.execute
);

router.get(
  "/seller/:sellerId",
  authMiddleware.execute,
  FindAllOrdersUserService.execute
);

export default router;
