import api from "./api";


export interface PropertyData {
  title: string;
  city: string;
  state: string;
  price: number;
  area: number;
  propertyType: "Apartment" | "Villa" | "Plot" | "Commercial";
}


export type PropertyFilters = {
  search?: string;
  city?: string;
  propertyType?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};



// Create Property
export const createProperty = async (
  data: PropertyData
) => {

  const response = await api.post(
    "/properties",
    data
  );

  return response.data;
};




// Get Properties
// Search + Filter + Sort + Pagination
export const getProperties = async (
  filters?: PropertyFilters
) => {

  const response = await api.get(
    "/properties",
    {
      params: filters,
    }
  );

  return response.data;
};




// Alias
export const getMyProperties = getProperties;




// Get Single Property
export const getPropertyById = async (
  id: string
) => {

  const response = await api.get(
    `/properties/${id}`
  );

  return response.data;

};




// Update Property
export const updateProperty = async (
  id: string,
  data: Partial<PropertyData>
) => {

  const response = await api.put(
    `/properties/${id}`,
    data
  );

  return response.data;

};




// Delete Property
export const deleteProperty = async (
  id: string
) => {

  const response = await api.delete(
    `/properties/${id}`
  );

  return response.data;

};




// Upload Images
export const uploadPropertyImages = async (
  id: string,
  files: File[]
) => {

  const formData = new FormData();


  files.forEach((file) => {

    formData.append(
      "images",
      file
    );

  });



  const response = await api.post(
    `/properties/${id}/images`,
    formData,
    {
      headers:{
        "Content-Type":
        "multipart/form-data",
      },
    }
  );


  return response.data;

};