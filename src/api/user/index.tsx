import API from "api";

export const userSettings = (settingsData: any) =>
  API.post("/user/settings", settingsData);

