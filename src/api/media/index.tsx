import API from "api";

export const pictureUpload = (formData: any) =>
  API.post("/media/upload/profile", formData);

export const picturesUpload = (formData: any) =>
  API.post("/media/upload/photos", formData);

export const addUpload = (formData: any) =>
  API.post("/media/upload/add", formData);

export const getLatestAddsFeed = (page: any, pageSize: any) =>
  API.get("/media/add", {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
