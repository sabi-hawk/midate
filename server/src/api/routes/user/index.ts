import { Router } from "express";
import * as userController from "../../controllers/user";

const userRouter = Router();

userRouter.get("/",userController.getUser);

export default userRouter;

