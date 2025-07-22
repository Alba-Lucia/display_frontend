import { Calendar, List, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductList } from "../services/productList";

type Item = {
  id: number;
  product: { name: string; expirationDate: string; inDisplay?: boolean };
  quantity: number;
  createdAt: string;
};

function normalizeDate(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getProductList().then(setItems).catch(console.error);
  }, []);

  const today = normalizeDate(new Date());

  // Productos vencidos
  const createdMoreThan5DaysAgo = items.filter((item) => {
    const createdAtDate = normalizeDate(new Date(item.createdAt));
    const diffTime = today.getTime() - createdAtDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 5;
  }).length;

  // Productos creados hoy
  const addedTodayOrOneDayAgo = items.filter((item) => {
    const createdAtDate = normalizeDate(new Date(item.createdAt));
    const diffTime = today.getTime() - createdAtDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 || diffDays === 1; // 0 es hoy, 1 es ayer
  }).length;

  // Total productos creados (todos)
  const totalCreated = items.length;

  return (
    <main className="px-4 space-y-6 bg-muted min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* Casilla roja: productos vencidos (más de 5 días) */}
        <div className="bg-red-100 rounded-2xl p-6 text-center">
          <p className="text-6xl text-red-500 font-bold p-2">
            {createdMoreThan5DaysAgo}
          </p>
          <p className="text-2xl text-gray-600 font-semibold">Expired</p>
        </div>

        {/* Casilla verde: productos creados hoy y productos con solo 1 día */}
        <div className="bg-yellow-100 rounded-2xl p-6 text-center space-y-2">
          <p className="text-6xl font-bold text-gray-600 p-2">
            {addedTodayOrOneDayAgo}
          </p>
          <p className="text-2xl text-gray-600 font-semibold">Today</p>
        </div>

        {/* Casilla azul: total productos creados */}
        <div className="flex sm:block justify-center items-center space-x-2 col-span-2 sm:col-span-1 bg-blue-100 rounded-2xl p-6 text-center min-h-45">
          <p className="text-6xl p-2 font-bold text-blue-600">{totalCreated}</p>
          <p className="text-2xl text-gray-600 font-semibold mt-1">
            Display Products
          </p>
        </div>
      </div>

      {/* Resto del contenido igual */}
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
    </main>
  );
}
