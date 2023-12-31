import { Request, Response } from "express";
import { httpMethod } from "..";
import { authenticateRequest } from "../../middleware/auth";
import Story from "../../../models/Story";
import About from "../../../models/About";
import { Types } from 'mongoose';

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
export const getLatestStories = httpMethod(async (req: Request, res: Response) => {
    const data = await authenticateRequest(req, res);
    const { page, pageSize } = req.params;

    const pageNumber = parseInt(page as string);
    const size = parseInt(pageSize as string);

    if (pageNumber < 1 || size < 1) {
        throw {
            status: 400,
            message: "Invalid page or page size"
        }
    }

    const skip = (pageNumber - 1) * size;

    try {
        const totalStories = await Story.countDocuments({});

        const stories = await Story.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
            .skip(skip)
            .limit(size)
            .populate('userId', '-password');

        if (!stories) {
            throw {
                status: 404,
                message: "No stories found"
            }
        }

        // Extract userIds from the stories
        // @ts-ignore
        const userIds = stories.map((story) => story.userId._id);

        // Find about data for the userIds
        const aboutData = await About.find({ userId: { $in: userIds } });

        // Create a map of userId to about data
        const aboutDataMap = new Map();
        aboutData.forEach((about) => {
            // @ts-ignore
            aboutDataMap.set(about.userId.toString(), about);
        });

        // Append about data to each story
        const storiesWithAbout = stories.map((story) => {
            // @ts-ignore
            const userId = story.userId._id.toString();
            // @ts-ignore
            return {
                // @ts-ignore
                ...story._doc,
                user: story.userId,
                // @ts-ignore
                about: aboutDataMap.get(userId),
            };
        });
        res.status(200).json({
            message: "Fetched Latest Stories",
            stories: storiesWithAbout,
            total: totalStories,
            currentPage: pageNumber,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


export const postComment = httpMethod(async (req: Request, res: Response) => {
    try {
      // Authenticate the request (assuming you have a separate function for this)
      const data = await authenticateRequest(req, res);
  
      // Extract the storyId from the route parameter
      const storyId = req.params.storyId;
  
      // Find the relevant story
      const story = await Story.findById(storyId);
  
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
  
      // Create the new comment object from the request body
      const comment = {
        userId: req.body.userId,
        userName: req.body.userName, // Assuming you have userName in authenticated data
        userProfilePic: req.body.userProfilePic, // Similarly for userProfilePic
        content: req.body.content,
        createdAt: new Date(),
      };
  
      // Push the new comment to the story's comments array
      story.comments.push(comment);
  
      // Save the updated story
      await story.save();
  
      res.status(200).json({ message: "Comment added successfully", comment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

export const updateStory = httpMethod(async (req: Request, res: Response) => {

})

export const deleteStory = httpMethod(async (req: Request, res: Response) => {

})