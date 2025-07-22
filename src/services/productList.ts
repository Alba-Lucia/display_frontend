import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los productos de la lista
export const getProductList = async () => {
  const res = await axios.get(`${API_URL}/api/product-list`);
  return res.data;
};

export const getAllProducts = async () => {
  const res = await axios.get(`${API_URL}/api/product-list`);
  return res.data;
};

// Agregar un producto
export const addProductToList = async (data: {
  productId: number;
  quantity: number;
  createdAt?: string;
}) => {
  const res = await axios.post(`${API_URL}/api/product-list`, data);
  return res.data;
};

// Editar cantidad o fecha
export const updateProductInList = async (
  id: number,
  data: { quantity: number; createdAt?: string }
) => {
  const res = await axios.put(`${API_URL}/api/product-list/${id}`, data);
  return res.data;
};

// Eliminar producto
export const deleteProductFromList = async (id: number) => {
  const res = await axios.delete(`${API_URL}/product-list/api/${id}`);
  return res.data;
};

