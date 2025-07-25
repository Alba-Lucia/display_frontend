import axios from "axios";
import { ProductListsSchema } from "../types";
import { safeParse } from "valibot";

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los productos de la lista
// export const getProductList = async () => {
//   const res = await axios.get(`${API_URL}/api/product-list`);
//   return res.data;
// };

export const getProductList = async () => {
  const res = await axios.get(`${API_URL}/api/product-list`);
  const result = safeParse(ProductListsSchema, res.data); // ✅ aquí sí funciona

  if (!result.success) {
    console.error("Error al validar la respuesta:", result.issues);
    return []; // o puedes lanzar un error si prefieres
  }

  return result.output; // ✅ Tipado correctamente como ProductList[]
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
  return res.data.data;  // acceder a data dentro del objeto recibido
};


// Eliminar producto
export const deleteProductFromList = async (id: number) => {
  const res = await axios.delete(`${API_URL}/product-list/api/${id}`);
  return res.data;
};

