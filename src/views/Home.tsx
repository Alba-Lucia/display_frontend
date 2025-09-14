import { Calendar, List, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductList } from "../services/productList";
import type { ProductList } from "../types";
import StockOrderListForm from "../components/stockOrderListForm";

function normalizeDate(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Función para validar que createdAt sea una fecha válida
function isValidDate(value: unknown): value is string | number | Date {
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
  return false;
}


export default function Home() {
  const [items, setItems] = useState<ProductList[]>([]);

  useEffect(() => {
    getProductList()
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de productos:", error);
        setItems([]);
      });
  }, []);

  const today = normalizeDate(new Date());

  const createdMoreThan5DaysAgo = items.filter((item) => {
    if (!isValidDate(item.createdAt)) return false; // valida antes
    const createdAtDate = normalizeDate(new Date(item.createdAt));
    const diffTime = today.getTime() - createdAtDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 5;
  }).length;

  const addedTodayOrOneDayAgo = items.filter((item) => {
    if (!isValidDate(item.createdAt)) return false; // valida antes
    const createdAtDate = normalizeDate(new Date(item.createdAt));
    const diffTime = today.getTime() - createdAtDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 || diffDays === 1;
  }).length;

  const totalCreated = items.length;

  return (
    <main className="px-4 space-y-6 bg-muted min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-red-100 rounded-2xl p-6 text-center">
          <p className="text-6xl text-red-500 font-bold p-2">{createdMoreThan5DaysAgo}</p>
          <p className="text-2xl text-gray-600 font-semibold">Expired</p>
        </div>

        <div className="bg-yellow-100 rounded-2xl p-6 text-center space-y-2">
          <p className="text-6xl font-bold text-gray-600 p-2">{addedTodayOrOneDayAgo}</p>
          <p className="text-2xl text-gray-600 font-semibold">Today</p>
        </div>

        <div className="flex sm:block justify-center items-center space-x-2 col-span-2 sm:col-span-1 bg-blue-100 rounded-2xl p-6 text-center min-h-45">
          <p className="text-6xl p-2 font-bold text-blue-600">{totalCreated}</p>
          <p className="text-2xl text-gray-600 font-semibold mt-1">Display Products</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-dark mt-6">Display products</h2>

      <Link
        to="productListPage"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-white bg-primary font-medium hover:bg-primary/90 transition"
      >
        <span className="text-lg">🎁</span>
        Add Item to Display or Baked Products
      </Link>

      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary text-primary rounded-2xl font-medium hover:bg-blue-50 transition">
        <Plus />
        Order list garage
      </button>

      <div className="space-y-4 mt-4">
        <Link
          to="productListDisplay"
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-white border border-gray-300 text-dark hover:bg-muted transition"
        >
          <Calendar />
          Products list display
        </Link>

        <Link
          to="ProductListCategory"
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-white border border-gray-300 text-dark hover:bg-muted transition"
        >
          <List />
          Product List Category
        </Link>
      </div>
      <StockOrderListForm/>
    </main>
  );
}
