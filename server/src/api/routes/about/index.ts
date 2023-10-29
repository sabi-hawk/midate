import { Router } from "express";
import * as aboutController from "../../controllers/about";

const aboutRouter = Router();

aboutRouter.post("/update",aboutController.updateAbout);

export default aboutRouter;

