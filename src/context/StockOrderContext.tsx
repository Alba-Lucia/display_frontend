// context/StockOrderContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import type { StockOrderAddList } from "../types";

type StockOrderContextType = {
  products: StockOrderAddList[];
  addProduct: (product: StockOrderAddList) => void;
};

const StockOrderContext = createContext<StockOrderContextType | undefined>(undefined);

export function StockOrderProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<StockOrderAddList[]>([]);

  const addProduct = (product: StockOrderAddList) => {
    // evita duplicados: si ya existe, no lo vuelves a agregar
    if (!products.find((p) => p.productId === product.productId)) {
      setProducts((prev) => [...prev, product]);
    }
  };

  return (
    <StockOrderContext.Provider value={{ products, addProduct }}>
      {children}
    </StockOrderContext.Provider>
  );
}

export const useStockOrder = () => {
  const context = useContext(StockOrderContext);
  if (!context) throw new Error("useStockOrder must be used within StockOrderProvider");
  return context;
};
