import AuthService from "@/authentication/auth.service";
import axios from "axios";
const auth: AuthService = new AuthService();

const getBearerToken = () => {
  const token = auth.getToken();
  return token;
};

const handleError = (error: any) => {
  if (error.response.statusText === "Unauthorized" ||error.response.code == 401) {
    auth.clearToken();
    window.location.assign("/login");
  }
  // if(error.response.data ="Invalid Token"){
  //   auth.clearToken();
  //   window.location.assign("/login");
  // }
  console.error("An error occurred:", error);
};

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getBearerToken()}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

const updateBearerToken = () => {
  axiosInstance.defaults.headers[
    "Authorization"
  ] = `Bearer ${getBearerToken()}`;
};

export { axiosInstance, updateBearerToken, handleError };
