import { Request, Response } from "express";
import { httpMethod } from "..";
import { authenticateRequest } from "../../middleware/auth";
import Notification from "../../../models/Notification";
import About from "../../../models/About";

export const createNotification = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    const { receiverId, content, type, notificationId } = req.body;

    if (type === 'chat') {
        await Notification.findByIdAndDelete(notificationId)
    }
    const notification = await new Notification({
        senderId: data.userId,
        receiverId,
        content,
        ...(type !== undefined && { type })
    }).save();
    res.status(200).json({ notification })
})

export const delNotification = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    const { notificationId } = req.params;
    await Notification.findByIdAndDelete(notificationId)
    res.status(200).json({ msg: "Notification Deleted Successfully!" })
})

export const getNotifications = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    const notifications = await Notification.find({
        receiverId: data.userId
    }).populate('senderId', '-password');

    const senderIds = notifications.map((notification) => notification.senderId);
    const aboutData = await About.find({ userId: { $in: senderIds } });

    // Create a map of userId to About data
    const aboutDataMap = new Map();
    aboutData.forEach((about: any) => {
        aboutDataMap.set(about.userId.toString(), about);
    });

    const notificationsWithUser = notifications.map((notification: any) => {
        const userId = notification.senderId._id.toString();
        const senderAbout = aboutDataMap.get(userId);
        return {
            ...notification._doc,
            sender: {
                ...notification.senderId._doc,
                about: senderAbout,
            },
        };
    });
    // Remove the senderId property from each object
    const notificationsWithoutSenderId = notificationsWithUser.map((notification: any) => {
        delete notification.senderId;
        return notification;
    });
    res.status(200).json({ notifications: notificationsWithoutSenderId || [] })
})