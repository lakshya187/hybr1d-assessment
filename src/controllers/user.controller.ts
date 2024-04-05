import { Router } from "express";
import CreateUserService from "../services/user/CreateUser.service";

const router = Router();

router.post("/", CreateUserService.execute);

export default router;
