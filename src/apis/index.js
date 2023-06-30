import axios from "axios";

/**
 * Axios Instance 정의
 * timeout: 3000
 * Content-Type: application/json
 */
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_HOST,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * 요청 Interceptor 정의
 *
 * 성공 전 Config
 * 실패 전 Error Exception 정의
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // config 반환
    return config;
  },
  (error) => {
    const { message } = error;
    const { status } = error.request;
    if (status >= 400 && status < 500) {
      // Client Error
      if (status === 401) {
        sessionStorage.clear();
        window.location.replace("/admin/login");
      }
      return Promise.reject({
        status: status,
        message: `The client request error with ${message}`,
      });
    } else if (status > 500) {
      // Internal Server Error
      return Promise.reject({
        status: status,
        message: `This API call request fail with ${message}`,
      });
    }
    return Promise.reject({
      status: status,
      message: `The axios call request error with ${message}`,
    });
  }
);

/**
 * 응답 Interceptor 정의
 *
 * 성공 전 Config
 * 실패 전 Error Exception 정의
 */
axiosInstance.interceptors.response.use(
  (config) => {
    // config 반환
    return config;
  },
  (error) => {
    const { message } = error;
    const { status } = error.response;
    if (status >= 400 && status < 500) {
      // Client Error
      if (status === 401) {
        sessionStorage.clear();
        window.location.replace("/admin/login");
      }
      return Promise.reject({
        status: status,
        message: `The client response error with ${message}`,
      });
    } else if (status > 500) {
      // Internal Server Error
      return Promise.reject({
        status: status,
        message: `This API call response fail with ${message}`,
      });
    }
    return Promise.reject({
      status: status,
      message: `The axios call response error with ${message}`,
    });
  }
);

export default axiosInstance;
