import { Router } from "express";
import * as userController from "../../controllers/user";

const userRouter = Router();

userRouter.get("/",userController.getUser);
userRouter.post("/settings",userController.settings);
export default userRouter;

