import { Router } from "express";
import * as userController from "../../controllers/user";

const userRouter = Router();

userRouter.get("/",userController.getUser);
userRouter.post("/settings",userController.settings);
userRouter.post("/profile/update",userController.updateProfileDetails);

userRouter.post("/profile/lookingfor",userController.setLookingFor);
userRouter.post("/profile/interests",userController.setInterests);
export default userRouter;

