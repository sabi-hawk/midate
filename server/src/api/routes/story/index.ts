import { Router } from "express";
import * as storyController from "../../controllers/story";

const storyRouter = Router();

storyRouter.post("/", storyController.createStory);
storyRouter.get("/stories/:userId", storyController.getUserStories);
storyRouter.get("/latest/stories", storyController.getLatestStories);
storyRouter.post("/update", storyController.updateStory);
storyRouter.delete("/:storyId", storyController.deleteStory);

export default storyRouter;

