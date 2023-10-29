import API from "api/index";

type sendMessagePayload = {
  senderId: string;
  text: string;
};
export const userChats = async (id: string) =>
  API.get(`/conversation/chat/user/${id}`);

export const getMessages = async (id: string) =>
  API.get(`/conversation/chat/${id}/messages`);

export const sendMessage = async (
  chatId: string,
  message: sendMessagePayload
) => API.post(`/conversation/chat/${chatId}/message`, message);

export const createConversation = async (
  providerId: string,
  clientId: string
) =>
  API.post("/conversation/chat", {
    senderId: clientId,
    receiverId: providerId,
  });

export async function sendEmail(mailBody: any) {
  API.post("/conversation/mailtrap/email", mailBody);
}
