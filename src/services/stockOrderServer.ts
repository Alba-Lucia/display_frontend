import axios from "axios";
import {
  StockOrderSchemas,
  type StockOrder,
  type StockOrderList,
} from "../types";
import { safeParse } from "valibot";

// export interface StockOrder {
//   id?: number;
//   name: string;
//   category?: string;
//   sku?: string;
// }

// Crear producto
export const createProduct = async (stockOrder: StockOrder) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/stockOrder`,
    stockOrder
  );
  return res.data.data;
};

// Obtener productos
export async function getStockOrder(): Promise<StockOrderList> {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/stockOrder`;
    const { data } = await axios(url);

    const result = safeParse(StockOrderSchemas, data.data);

    if (result.success) {
      return result.output; // tipo StockOrderList
    } else {
      console.error("❌ Error de validación:", result.issues);
      return [];
    }
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
}

export async function updateStockOrder(
  id: number,
  updates: Partial<StockOrder>
): Promise<StockOrder | null> {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/stockOrder/${id}`;
    const { data } = await axios.put(url, updates);
    return data.data;
  } catch (error) {
    console.error("❌ Error al editar producto:", error);
    return null;
  }
}

// Eliminar productos
export async function deleteStockOrder(id: number): Promise<boolean> {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/stockOrder/${id}`;
    await axios.delete(url);
    return true; // 👈 devolvemos true si salió bien
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    return false; // 👈 devolvemos false si hubo error
  }
}
