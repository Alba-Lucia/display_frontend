import { useEffect, useState } from "react";
import {
  clearTodayList,
  getAddedProducts,
} from "../services/StockOrderAddList";

const StockOrderListPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    getAddedProducts().then(setList);
  }, []);

  const handleClearList = async () => {
    if (confirm("¿Seguro que quieres vaciar toda la lista de hoy?")) {
      try {
        await clearTodayList();
        setList([]); // vaciar local
        alert("Lista vaciada ✅");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert("Error al vaciar la lista ❌");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        📝 Lista de productos añadidos hoy
      </h1>
      {list.length === 0 ? (
        <p>No hay productos en la lista de hoy</p>
      ) : (
        <ul className="space-y-2">
          {list.map((item) => (
            <li
              key={item.id}
              className="p-2 border rounded bg-blue-50 flex justify-between"
            >
              <span>
                <strong>{item.stockOrder?.name}</strong> (
                {item.stockOrder?.category})
              </span>
              <span>Cantidad: {item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleClearList}
        className="mt-4 mb-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Vaciar lista
      </button>
    </div>
  );
};

export default StockOrderListPage;
