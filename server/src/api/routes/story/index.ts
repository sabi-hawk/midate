import { Router } from "express";
import * as storyController from "../../controllers/story";

const storyRouter = Router();

storyRouter.post("/", storyController.createStory);
storyRouter.post("/update", storyController.updateStory);
storyRouter.delete("/:storyId", storyController.deleteStory);

export default storyRouter;

