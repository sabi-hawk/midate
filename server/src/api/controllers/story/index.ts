import { Request, Response } from "express";
import { httpMethod } from "..";
import { authenticateRequest } from "../../middleware/auth";
import Story from "../../../models/Story";
import About from "../../../models/About";

export const createStory = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);

    const story = await Story.create({
        userId: data.userId,
        content: req.body.content,
        likes: [],
        disLikes: []
    });

    res.status(200).json({
        message: "Story Created Successfully!",
        story
    })
})

export const getUserStories = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    const { userId } = req.params
    // Find the user's stories and populate the userId field
    const stories = await Story.find({ userId }).populate('userId', '-password');
    // Find the user's about data
    const about = await About.findOne({ userId }).select('-userId -_id');

    // Append the about data to each story
    const storiesWithAbout = stories.map((story: any) => ({
        ...story._doc,
        user: story.userId,
        about: about,
    }));
    // Remove the userId property from each object
    const storiesWithoutUserId = storiesWithAbout.map((story: any) => {
        delete story.userId;
        return story;
    });

    res.status(200).json({
        message: "Fetched Stories",
        stories: storiesWithoutUserId
    })
})

export const updateStory = httpMethod(async (req: Request, res: Response) => {

})

export const deleteStory = httpMethod(async (req: Request, res: Response) => {

})