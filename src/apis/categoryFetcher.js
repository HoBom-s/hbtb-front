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

async function createCategoryRequestService(title, path, sortIndex, spot) {
  try {
    const createCategoryResult = await axiosInstance.post("/category/create", {
      title: title,
      path: path,
      sortIndex: sortIndex,
      spot: spot,
    });
    const { data } = createCategoryResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Create category request service fail status: ${status}, message: ${message}`
    );
  }
}

export { getAllCategoryRequestService, createCategoryRequestService };
