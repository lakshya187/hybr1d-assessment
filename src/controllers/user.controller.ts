import { Router } from "express";
import CreateUserService from "../services/user/CreateUser.service";
import LoginUserService from "../services/user/LoginUser.service";

const router = Router();

router.post("/", CreateUserService.execute);
router.post("/login", LoginUserService.execute);

export default router;
