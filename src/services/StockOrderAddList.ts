import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// types/ProductForm.ts
export interface ProductFormData {
  productId: number;
  quantity: number;
}

export const addProductToList = async (data: {
  productId: number;
  quantity: number;
}) => {
  const res = await axios.post(`${API_URL}/api/stockOrderList`, data);
  return res.data;
};

// services/StockOrderAddList.ts
export const getAddedProducts = async () => {
  const res = await axios.get(`${API_URL}/api/stockOrderList`);
  return res.data;
};

export const clearTodayList = async () => {
  const res = await axios.delete(`${API_URL}/api/stockOrderList/clear`);
  return res.data;
};
