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

export { getAllArticleRequestService };
