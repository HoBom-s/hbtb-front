import axiosInstance from "./index";

async function userLoginRequestService(nickname, password) {
  try {
    const foundUser = await axiosInstance.post("/user/login", {
      nickname: nickname,
      password: password,
    });
    const { data } = foundUser;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(`User login failed with ${status}, message: ${message}`);
  }
}

async function userRegisterRequestService(
  nickname,
  password,
  profileImg,
  role,
  introduction
) {
  try {
    const createdUser = await axiosInstance.post("/user/create", {
      nickname: nickname,
      password: password,
      profileImg: profileImg,
      role: role,
      introduction: introduction,
    });
    const { data } = createdUser;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(`User register failed with ${status}, message: ${message}`);
  }
}

export { userLoginRequestService, userRegisterRequestService };
