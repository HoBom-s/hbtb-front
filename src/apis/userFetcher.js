import axiosInstance from "./index";

async function userGetMyInformationService(token) {
  try {
    const foundUser = await axiosInstance.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = foundUser;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(
      `User get information failed with ${status}, message: ${message}`
    );
  }
}

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

async function userLogoutRequestService(token, _id) {
  try {
    const logoutResult = await axiosInstance.post(
      "/user/logout",
      {
        _id: _id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = logoutResult;
    return data;
  } catch (error) {
    const { status, message } = error;
    throw new Error(`User logout failed with ${status}, message: ${message}`);
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

export {
  userGetMyInformationService,
  userLoginRequestService,
  userLogoutRequestService,
  userRegisterRequestService,
};
