import { Router } from "express";
import UserController from "./controllers/user.controller";
import CatalogueController from "./controllers/catalogue.controller";
import AuthMiddleware from "./middlewares/auth.middleware";
const router = Router();

router.use("/user", UserController);
router.use("/catalogue", AuthMiddleware.execute, CatalogueController);
export default router;
