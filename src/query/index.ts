import axios from "axios";
import queryString from "query-string";

export interface CustomError {
  code: string;
  message: string;
  status: number;
}

const Axios = axios.create({
  // baseURL: "http://127.0.0.1:8080/",
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,

  headers: {
    Accept: "application/json, text/plain, */*",
  },
});

Axios.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("accessToken");
  config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

Axios.interceptors.response.use((response) => {
  return response;
});

export default Axios;

export const stringify = (props: Record<string, any>): string => {
  return queryString.stringify(props, {
    skipNull: true,
    skipEmptyString: true,
    arrayFormatSeparator: "|",
  });
};
