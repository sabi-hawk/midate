import { Request, Response } from "express";
import { httpMethod } from "..";
import Conversation from "../../../models/Conversation";
import { authenticateRequest } from "../../middleware/auth";

export const createConversation = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    const chat = await new Conversation({
        members: [data.userId, req.body.receiverId]
    }).save();

    res.status(200).json(chat);
})

export const sendMessage = httpMethod(async (req: Request, res: Response) => {
    const { chatId } = req.params
    const data = await authenticateRequest(req, res);
    // @ts-ignore
    if (req.body?.senderId !== data?.userId) {
        return res.status(401).json({
            message: 'You are not authorized to access this chat.'
        })
    }
    const chat = await Conversation.findById(chatId);
    if (!chat) {
        res.status(404).json({ message: "Chat not found!" })
    }

    let memberFound: Boolean = false;
    await chat?.members.forEach((member) => {
        if (member === req.body.senderId) {
            memberFound = true
        }
    })
    if (!memberFound) {
        return res.status(404).json({ message: "You are not member of this chat!" })
    }
    const updatedChat = await Conversation.findByIdAndUpdate(chatId,
        {
            $push: {
                messages: {
                    senderId: req.body.senderId,
                    text: req.body.text
                }
            }
        },
        { new: true })
    const checkChat = await Conversation.findOne({ _id: chatId }, { messages: { $slice: -1 } })
    res.status(200).json(checkChat?.messages[0]); // updatedChat

})

export const getMessage = httpMethod(async (req: Request, res: Response) => {
    const { chatId, messageId } = req.params

    const chat = await Conversation.find({ _id: chatId, "messages._id": messageId });
    if (!chat) {
        res.status(404).json({ message: "Chat not found!" })
    }
    let memberFound: Boolean = false;
    if (!memberFound) {
        return res.status(404).json({ message: "You are not member of this chat!" })
    }
    const updatedChat = await Conversation.findByIdAndUpdate(chatId,
        {
            $push: {
                messages: {
                    senderId: req.body.senderId,
                    text: req.body.text
                }
            }
        },
        { new: true })
    res.status(200).json(updatedChat);

})

export const userChats = httpMethod(async (req: Request, res: Response) => {

    const data = await authenticateRequest(req, res);
    // @ts-ignore
    if (req.params.userId !== data?.userId) {
        return res.status(401).json({
            message: 'You are not authorized to access this chat.'
        })

    }
    const chat = await Conversation.find({
        members: { $in: [req.params.userId] }
    })
    return res.status(200).json(chat);

})

export const findChat = httpMethod(async (req: Request, res: Response) => {

    const chat = await Conversation.find({
        members: { $all: [req.params.firstId, req.params.secondId] }
    })
    res.status(200).json(chat);

})

export const getChat = httpMethod(async (req: Request, res: Response) => {

    const chat = await Conversation.findOne({ _id: req.params.chatId })
    res.status(200).json(chat);

})

export const getChatMessages = httpMethod(async (req: Request, res: Response) => {

    const chat = await Conversation.findOne({ _id: req.params.chatId })
    res.status(200).json(chat?.messages);

})