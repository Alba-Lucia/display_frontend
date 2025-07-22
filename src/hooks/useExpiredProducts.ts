import { useMemo } from "react";

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

const normalizeDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const useExpiredProducts = (products: Product[]) => {
  const today = useMemo(() => normalizeDate(new Date()), []);

  const expiredProducts = useMemo(() => {
    return products.filter((item) => {
      const createdAtDate = normalizeDate(new Date(item.createdAt));
      const diffTime = today.getTime() - createdAtDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 5; // considera "Vencido" después de 5 días
    });
  }, [products, today]);

  return expiredProducts;
};
