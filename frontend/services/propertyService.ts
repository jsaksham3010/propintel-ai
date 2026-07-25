import api from "./api";


export const createProperty = async (data:any) => {

  const response = await api.post(
    "/properties",
    data
  );

  return response.data;

};



export const getProperties = async () => {

  const response = await api.get(
    "/properties"
  );

  return response.data;

};



export const getMyProperties = async () => {

  const response = await api.get(
    "/properties"
  );

  return response.data;

};



export const getPropertyById = async (id:string) => {

  const response = await api.get(
    `/properties/${id}`
  );

  return response.data;

};