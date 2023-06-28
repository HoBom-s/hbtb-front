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

async function updateTagRequestService(tag) {
  try {
    const { _id, title, path, count } = tag;
    const updatedTagResult = await axiosInstance.patch("/tag/update", {
      _id: _id,
      title: title,
      path: path,
      count: count,
    });
    const { data } = updatedTagResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Tag update request service fail status: ${status}, message: ${message}`
    );
  }
}

async function deleteTagRequestService(_id) {
  try {
    const removedTagResult = await axiosInstance.delete(`/tag/delete/${_id}`);
    const { data } = removedTagResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Tag delete request service fail status: ${status}, message: ${message}`
    );
  }
}

export {
  getAllTagRequestService,
  createTagRequestService,
  updateTagRequestService,
  deleteTagRequestService,
};
