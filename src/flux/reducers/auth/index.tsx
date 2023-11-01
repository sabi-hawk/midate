import { createSlice } from "@reduxjs/toolkit";

type appUser = {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone?: string;
  dob: String;
  gender: String;
  role: String;
  about: {
    city: String;
    country: String;
    images: Array<String>;
    notifications: String;
    preferredGender: String;
    userId: String;
    _id: String;
    profilePic: string;
    interestsTags: Array<string>;
    lookingForTags: Array<string>;
    photos: Array<string>;
  };
};

type authType = {
  user: appUser;
  token: String;
};

// @ts-ignore
const initialState: authType = {};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state = initialState, action) => {
      if (Object.keys(action.payload).length !== 0) {
        return { ...state, ...action.payload };
      }
      return action.payload;
    },
  },
});

export default auth.reducer;
export const { setUser } = auth.actions;
