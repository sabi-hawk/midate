import { Request, Response } from "express";
import path from "path";
import * as fs from "fs";
import { httpMethod } from "..";
import { authenticateRequest } from "../../middleware/auth";
import About from "../../../models/About";


export const upload = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    if (!req.file) {
        throw {
            status: 400,
            message: "Upload a file please!",
        };
    }

    const fileNames: string[] = [];

    if (Array.isArray(req.file)) {
        // Handle multiple files
        req.file.forEach((file) => {
            const fileName = `${data.userId}-photo-${Date.now()}${file.originalname}`;
            fileNames.push(`${process.env.BASE_URL}/images/${fileName}`);
            fs.renameSync(file.path, path.join(path.resolve(__dirname, "../../../../uploads/"), fileName));
        });
    } else {
        // Handle single file
        const fileName = `${Date.now()}${req.file.originalname}`;
        fileNames.push(`${process.env.BASE_URL}/images/${fileName}`);
        fs.renameSync(req.file.path, path.join(path.resolve(__dirname, "../../../../uploads/"), fileName));
    }

    const about = await About.findOneAndUpdate(
        { userId: data.userId },
        {
            $set: {
                photos: fileNames,
            },
        },
        { upsert: true, new: true }
    );

    res.status(200).json({
        message: "File(s) uploaded successfully!",
        about,
    });

})


export const uploadProfilePic = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    if (!req.file) {
        throw {
            status: 400,
            message: "Upload a file please!",
        };
    }
    const fileName = `${data.userId}-profile-${Date.now()}${req.file.originalname}`;
    fs.renameSync(req.file.path, path.join(path.resolve(__dirname, "../../../../uploads/"), fileName));
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