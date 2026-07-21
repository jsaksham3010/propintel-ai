import api from "./api";

export const getProperties = async () => {
  const response = await api.get("/properties");

  return response.data;
};