import axiosInstance from "./index";

async function getAllCategoryRequestService() {
  try {
    const categoryResult = await axiosInstance.get("/category");
    const { data } = categoryResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Get all category request service fail status: ${status}, message: ${message}`
    );
  }
}

export { getAllCategoryRequestService };
