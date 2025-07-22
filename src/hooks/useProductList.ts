// src/hooks/useProductList.ts
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { updateProductInList } from "../services/productList";

const API_URL = "http://localhost:5000";

export interface Product {
  id: number;
  createdAt: string;
  quantity: number;
  product: {
    id: number;
    name: string;
    quantity: number;
    unit: string | null;
  };
}

export const useProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product-list`);
        setProductList(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de productos:", error);
        toast.error("Error cargando productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductList();
  }, []);

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/api/product-list/${id}`);
      setProductList((prev) => prev.filter((item) => item.id !== id));
      toast.success("Producto eliminado");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast.error("No se pudo eliminar el producto");
    }
  };

  const editProduct = async (
    id: number,
    updatedData: { quantity: number; createdAt: string }
  ) => {
    try {
      await updateProductInList(id, updatedData);
      setProductList((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: updatedData.quantity, createdAt: updatedData.createdAt }
            : item
        )
      );
      toast.success("Producto actualizado");
    } catch (error) {
      console.error("Error al editar el producto:", error);
      toast.error("No se pudo actualizar");
    }
  };

  return {
    productList,
    setProductList,
    loading,
    deleteProduct,
    editProduct,
  };
};
