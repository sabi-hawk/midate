import { Request, Response } from "express";
import { httpMethod } from "..";
import { authenticateRequest } from "../../middleware/auth";
import About from "../../../models/About";

export const updateAbout = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);

    const about = await About.findOne({ userId: data.userId })
    if (about) {
        const updatedAbout = await About.findByIdAndUpdate(about._id, {
            userId: data.userId,
            updatedAt: Date.now(),
            ...(req.body)
        })

        return res.status(200).json({ about: updatedAbout })
    }

    const newAbout = await new About({
        userId: data.userId,
        ...(req.body)
    }).save()
    return res.status(200).json({ about: newAbout })
})