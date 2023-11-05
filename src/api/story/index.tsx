import API from "api";

export const createStory = (content: any) =>
  API.post("/story", { content: content });

export const getStories = (userId: any) => API.get(`/story/stories/${userId}`);
