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

async function createCategoryRequestService(
  title,
  path,
  sortIndex,
  spot,
  token
) {
  try {
    const sendToSpot = spot === "Header" ? "H" : "F";
    const createCategoryResult = await axiosInstance.post(
      "/category/create",
      {
        title: title,
        path: path,
        sortIndex: sortIndex,
        spot: sendToSpot,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = createCategoryResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Create category request service fail status: ${status}, message: ${message}`
    );
  }
}

async function updateCategoryRequestService(category, token) {
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
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

async function deleteCategoryRequestService(_id, token) {
  try {
    const deletedCategoryResult = await axiosInstance.delete(
      `/category/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
