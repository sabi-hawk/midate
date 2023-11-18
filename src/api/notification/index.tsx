import API from "api";

export const createNotification = (formData: any) =>
  API.post("/notification", formData);

export const getNotifications = () => API.get("/notification");

export const delNotification = (notificationId: any) =>
  API.delete(`/notification/${notificationId}`);
