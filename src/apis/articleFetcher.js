import axiosInstance from "./index";

async function getAllArticleRequestService() {
  try {
    const articleResult = await axiosInstance.get("/article");
    const { data } = articleResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Get all article request service fail status: ${status}, message: ${message}`
    );
  }
}

async function getArticlePerPageRequestService(pageNumber, perPageNumber) {
  try {
    const articleResult = await axiosInstance.get(
      `/article/list?pageNumber=${pageNumber}&perPage=${perPageNumber}`
    );
    const { data } = articleResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Get article per page request service fail status: ${status}, message: ${message}`
    );
  }
}

export { getAllArticleRequestService, getArticlePerPageRequestService };
