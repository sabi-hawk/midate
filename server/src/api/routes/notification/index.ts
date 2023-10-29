import { Router } from "express";
import * as notificationController from "../../controllers/notification";

const notificationRouter = Router();

notificationRouter.post("/",notificationController.createNotification);

export default notificationRouter;

