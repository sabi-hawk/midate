import { Request, Response } from "express";
import { httpMethod } from "..";
import { SECRET } from "../../../config/app";
import Session from "../../../models/Session";
import User from "../../../models/User";
import { validateLoginRequest, validateRegisterRequest } from "./validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const register = httpMethod(async (req, res): Promise<any> => {
    const reqData = await validateRegisterRequest(req);
    const existingUser = await User.findOne({ email: reqData.email });
    if (existingUser) {
        throw {
            status: 400,
            message: "Email Already Exists!",
        };
    }

    const hashedPassword = await bcrypt.hash(reqData.password, 10);
    const user = await User.create({ ...reqData, password: hashedPassword });
    res.status(201).json({ user: { name: user.name, email: user.email, phone: user.phone, dob: user.dob, gender: user.gender }, message: "Signed Up Successfully !" })
})

export const login = httpMethod(async (req, res) => {
    const reqData = await validateLoginRequest(req);
    const existingUser = await User.findOne({ email: reqData.email });

    if (!existingUser) {
        return res.status(400).json({ message: "User not Found!" })
    }
    const matchPassword = await bcrypt.compare(reqData.password, existingUser.password)

    if (!matchPassword) {
        return res.status(400).json({ message: "Invalid Credentials !" })
    }

    const session = await createSession(existingUser)
    res.status(200).json({ user: existingUser, token: session.accessToken, expiresAt: session.expiresAt, message: "Successfully LoggedIn!" })
})


// update the current accessToken's time  again to which its ideally is
export const refreshToken = httpMethod(async (req: Request, res: Response) => {

})

// remove the current session from db
export const logout = httpMethod(async (req: Request, res: Response) => {

})
const createSession = async (user: any) => {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    const newSession = await new Session({
        userId: user._id,
        expiresAt: expiresAt
    }).save();
    const token = jwt.sign({ email: user.email, userId: user._id, sessionId: newSession._id }, SECRET);
    newSession.accessToken = token;
    return newSession.save()
}