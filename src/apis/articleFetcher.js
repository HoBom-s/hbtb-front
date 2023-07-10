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

async function getArticleFindById(_id) {
  try {
    const foundArticleResult = await axiosInstance.get(`/article/find/${_id}`);
    const { data } = foundArticleResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Get article by id request servie fail status: ${status}, message: ${message}`
    );
  }
}

async function getArticleSearchByKeywordService(keyword) {
  try {
    const articleSearchResult = await axiosInstance.get(
      `/article/search?keyword=${keyword}`
    );
    const { data } = articleSearchResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Get article search by keyword service fail status: ${status}, message: ${message}`
    );
  }
}

async function createArticleRequestService(
  thumbnail,
  title,
  subtitle,
  contents,
  tags,
  writers,
  path,
  token
) {
  try {
    const articleCreateResult = await axiosInstance.post(
      "/article/create",
      {
        thumbnail: thumbnail,
        title: title,
        subtitle: subtitle,
        contents: contents,
        tags: tags,
        writers,
        path: path,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = articleCreateResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Create article fail status: ${status}, message: ${message}`
    );
  }
}

async function deelteArticleRequestService(articleId, token) {
  try {
    const deleteArticleResult = await axiosInstance.delete(
      `/article/delete/${articleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = deleteArticleResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `Delete article fail status: ${status}, message: ${message}`
    );
  }
}

export {
  getAllArticleRequestService,
  getArticlePerPageRequestService,
  getArticleFindById,
  getArticleSearchByKeywordService,
  createArticleRequestService,
  deelteArticleRequestService,
};
