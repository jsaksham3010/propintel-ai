import api from "./api";

export const getPropertyById = async (id: string) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const uploadPropertyImages = async (
  id: string,
  files: File[]
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await api.post(
    `/properties/${id}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const analyzeProperty = async (id: string) => {
  const response = await api.post(`/ai/analyze/${id}`);
  return response.data;
};

export const getAIReport = async (id: string) => {
  const response = await api.get(`/ai/report/${id}`);
  return response.data;
};