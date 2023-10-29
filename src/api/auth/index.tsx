import API from "api";

type loginPayload = {
  email: string;
  password: string;
};
export const login = (loginData: loginPayload) =>
  API.post("/auth/login", loginData);

export const register = (signUpData: any) =>
  API.post("/auth/register", signUpData);
