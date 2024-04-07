import { Router } from "express";
import CreateCatalogueService from "../services/catalogue/CreateCatalogue.service";

const router = Router();

router.post("/", CreateCatalogueService.execute);

export default router;
