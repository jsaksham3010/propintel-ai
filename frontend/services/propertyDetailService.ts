import api from "./api";

export const getPropertyById = async (id: string) => {
  const response = await api.get(`/properties/${id}`);

  return response.data;
};