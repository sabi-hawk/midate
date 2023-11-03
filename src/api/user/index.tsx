import API from "api";

export const userSettings = (settingsData: any) =>
  API.post("/user/settings", settingsData);

export const setLookingFor = (lookingForTags: any) =>
  API.post("/user/profile/lookingfor", lookingForTags);

export const setInterestsTags = (interestsTags: any) =>
  API.post("/user/profile/interests", interestsTags);

export const updateUserDetails = (userDetails: any) =>
  API.post("/user/profile/update", userDetails);

export const getUserMatches = (
  preferredGender: string,
  city: string,
  country: string
) => API.get(`/user/matches/${preferredGender}/${city}/${country}`);
