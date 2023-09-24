import { Request, Response } from "express";
import path from "path";
import * as fs from "fs";
import { httpMethod } from "..";


export const upload = httpMethod(async (req: Request, res: Response) => {

    if (!req.file) {
        return res.status(400).send({ message: "Upload a file please!" });
    }

    const fileNames: string[] = [];

    if (Array.isArray(req.file)) {
        // Handle multiple files
        req.file.forEach((file) => {
            const fileName = `${Date.now()}${file.originalname}`;
            fileNames.push(fileName);
            fs.renameSync(file.path, path.join(path.resolve(__dirname, "../../../../public/"), fileName));
        });
    } else {
        // Handle single file
        const fileName = `${Date.now()}${req.file.originalname}`;
        fileNames.push(fileName);
        fs.renameSync(req.file.path, path.join(path.resolve(__dirname, "../../../../public/"), fileName));
    }

    return res.status(200).json({
        message: "File(s) uploaded successfully!",
        nameList: fileNames,
    });

})


export const uploadAWS = httpMethod(async (req: Request, res: Response) => {
    res.status(200).json({
        message: "Uploaded!",
        files: req.files,
    });
})