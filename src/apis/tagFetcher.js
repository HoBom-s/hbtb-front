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

export { getAllTagRequestService };
