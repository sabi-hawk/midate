import { Request, Response } from "express";
import path from "path";
import * as fs from "fs";
import { httpMethod } from "..";
import { authenticateRequest } from "../../middleware/auth";
import About from "../../../models/About";


export const upload = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    console.log("Request :", req.files)
    if (!req.files || req.files.length === 0) {
        throw {
            status: 400,
            message: "Upload at least one file, please!",
        };

    }
    const fileNames: string[] = [];
    // @ts-ignore
    req.files.forEach((file) => {
        const fileName = `${data.userId}-photo-${Date.now()}${file.originalname}`;
        fileNames.push(`${process.env.BASE_URL}/images/${fileName}`);
        fs.renameSync(file.path, path.join(path.resolve(__dirname, "../../../../uploads/"), fileName));
    });

    const about = await About.findOne({ userId: data.userId });
    if (about) {
        about.photos.push(...fileNames);
        await about.save();
    }

    res.status(200).json({
        message: "File(s) uploaded successfully!",
        about,
    });
});




export const uploadProfilePic = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    if (!req.files || req.files.length === 0) {
        throw {
            status: 400,
            message: "Upload at least one file, please!",
        };
    }
    // @ts-ignore
    const file = req.files[0]
    const fileName = `${data.userId}-profile-${Date.now()}${file.originalname}`;
    fs.renameSync(file.path, path.join(path.resolve(__dirname, "../../../../uploads/"), fileName));
    const about = await About.findOneAndUpdate(
        { userId: data.userId },
        {
            $set: {
                profilePic: `${process.env.BASE_URL}/images/${fileName}` || '',
            },
        },
        { upsert: true, new: true }
    );

    res.status(200).json({
        message: "File uploaded successfully!",
        name: fileName,
        about
    });
})