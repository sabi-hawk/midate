import { Router } from "express";
import * as notificationController from "../../controllers/notification";

const notificationRouter = Router();

notificationRouter.post("/",notificationController.createNotification);
notificationRouter.get("/",notificationController.getNotifications);
notificationRouter.delete("/:notificationId",notificationController.delNotification);
export default notificationRouter;

