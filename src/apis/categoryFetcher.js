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
    const sendToSpot = spot === "Header" ? "H" : "F";
    const createCategoryResult = await axiosInstance.post("/category/create", {
      title: title,
      path: path,
      sortIndex: sortIndex,
      spot: sendToSpot,
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

async function updateCategoryRequestService(category) {
  try {
    const { _id, title, path, sortIndex, spot } = category;
    const sendToSpot = spot === "Header" ? "H" : "F";
    const updateedCategoryResult = await axiosInstance.patch(
      `/category/update`,
      {
        _id: _id,
        title: title,
        path: path,
        sortIndex: sortIndex,
        spot: sendToSpot,
      }
    );
    const { data } = updateedCategoryResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Update category request service fail status: ${status}, message: ${message}`
    );
  }
}

async function deleteCategoryRequestService(_id) {
  try {
    const deletedCategoryResult = await axiosInstance.delete(
      `/category/${_id}`
    );
    const { data } = deletedCategoryResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Delete category request service fail status: ${status}, message: ${message}`
    );
  }
}

export {
  getAllCategoryRequestService,
  createCategoryRequestService,
  updateCategoryRequestService,
  deleteCategoryRequestService,
};
