import axios from "axios";

export const getInitialApi = () => {
  const initialApi = axios.create({
    baseURL: "http://localhost:8080/prime-tech/api/v1",
    headers: { "Content-Type": "application/json" },
  });

  return initialApi;
};
