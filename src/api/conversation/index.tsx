import API from "api";

export const createConversation = (formData: any) =>
  API.post("/conversation", formData);

export const getUserConversations = (userId: any) =>
  API.get(`/conversation/user/${userId}`);
