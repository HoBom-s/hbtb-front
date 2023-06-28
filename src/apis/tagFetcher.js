import axiosInstance from "./index";

async function getAllTagRequestService() {
  try {
    const tagResult = await axiosInstance.get("/tag");
    const { data } = tagResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Get all tag request service fail status: ${status}, message: ${message}`
    );
  }
}

async function createTagRequestService(title, path) {
  try {
    const createdTagResult = await axiosInstance.post("/tag/create", {
      title: title,
      path: path,
    });
    const { data } = createdTagResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Tag create request service fail status: ${status}, message: ${message}`
    );
  }
}

export { getAllTagRequestService, createTagRequestService };
