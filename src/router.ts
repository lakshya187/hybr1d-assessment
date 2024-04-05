import { Router } from "express";
import UserController from "./controllers/user.controller";
const router = Router();

router.use("/user", UserController);

export default router;
