import axiosInstance from "./index";

async function userLoginRequestService(nickname, password) {
  try {
    const createdUser = await axiosInstance.post("/user/create", {
      nickname: nickname,
      password: password,
    });
    const { data } = createdUser;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(`User register failed with ${status}, message: ${message}`);
  }
}

export { userLoginRequestService };
