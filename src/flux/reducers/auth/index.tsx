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
  token: string;
  expiresAt: string;
};

type authType = {
  user: appUser;
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
