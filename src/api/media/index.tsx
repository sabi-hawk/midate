import API from "api";

export const pictureUpload = (formData: any) =>
  API.post("/media/upload/profile", formData);


export const picturesUpload = (formData: any) =>
  API.post("/media/upload/photos", formData);
