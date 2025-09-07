import axios from "axios";
import { safeParse } from "valibot";
import {
  DraftProductSchema,
  ProductSchema,
  ProductsSchema,
  type Product,
} from "../types";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    // Convertir todos los valores a string
    const parsedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, String(value)])
    );

    const result = safeParse(DraftProductSchema, parsedData);

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, result.output);
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProduct(): Promise<Product[]> {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      console.error(
        "❌ Error al validar datos con ProductsSchema:",
        result.issues
      );
      return [];
    }
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    const parsedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, String(value)])
    );

    const result = safeParse(ProductSchema, {
      id: Number(id),
      name: parsedData.name,
      sku: parsedData.sku,
      quantity: parsedData.quantity ? Number(parsedData.quantity) : null,
      unit: parsedData.unit || null,
      expirationDate: parsedData.expirationDate || null,
      addedToday: parsedData.addedToday === "true",
      inList: parsedData.inList === "true",
      statusLabel: parsedData.statusLabel || null,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    } else {
      console.error("❌ Error de validación:");
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchProducts(q: string, page: number, pageSize: number) {
  try {
    const url = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/products/`,
      {
        params: { q, page, pageSize },
      }
    );
    return url.data;
  } catch (error) {
    console.log(error);
  }
  // { data: rows, page, pageSize, total }
}
