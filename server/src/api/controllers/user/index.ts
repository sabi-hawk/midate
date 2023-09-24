import { httpMethod } from "..";
import { Request, Response } from "express";
import { authenticateRequest } from "../../middleware/auth";
import User from "../../../models/User";


export const getUser = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    let user = await User.findOne({ _id: data.userId });
    if (user) {
        return res.status(200).json(user);
    }
    return res.status(404).json({ message: "User not found" })
})