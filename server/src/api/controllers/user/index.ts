import { httpMethod } from "..";
import { Request, Response } from "express";
import { authenticateRequest } from "../../middleware/auth";
import User from "../../../models/User";
import About from "../../../models/About";
import bcrypt from "bcrypt";

export const getUser = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    let user = await User.findOne({ _id: data.userId });
    if (user) {
        return res.status(200).json(user);
    }
    return res.status(404).json({ message: "User not found" })
})

export const settings = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    const { email, password, phone } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findOneAndUpdate(
        { _id: data.userId },
        {
            $set: {
                ...(email !== '' && { email: email }),
                ...(phone !== '' && { phone: phone }),
                ...(password !== '' && { password: hashedPassword })
            },
        },
        { new: true }
    );

    await About.findOneAndUpdate(
        { userId: data.userId },
        {
            $set: {
                city: req.body.city || '',
                country: req.body.country || '',
                preferredGender: req.body.preferredGender || 'Female',
                notifications: req.body.notifications || 'On',
            },
        },
        { upsert: true, new: true }
    );

    if (updatedUser) {
        return res.status(200).json({ message: "Data Update Successfully!" });
    }

    return res.status(404).json({ message: "User not found" });
});
