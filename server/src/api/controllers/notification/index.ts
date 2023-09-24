import { Request, Response } from "express";
import { httpMethod } from "..";
import { authenticateRequest } from "../../middleware/auth";
import Notification from "../../../models/Notification";

export const createNotification = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    const { receiverId, content, type } = req.body;

    const notification = await new Notification({
        senderId: data.userId,
        receiverId,
        content,
        ...(type !== undefined && { type })
    }).save();

    return res.status(200).json({ notification })
})