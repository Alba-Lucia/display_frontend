import { useEffect, useState } from "react";
import {
  clearTodayList,
  deleteStockOrderAddToList,
  getAddedProducts,
  updateStockOrderAddToList,
} from "../services/StockOrderAddList";
import { Pencil, Trash2 } from "lucide-react";
import type { StockOrderAddList } from "../types";
import { Modal } from "../modals/Modal";

const StockOrderListPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [list, setList] = useState<any[]>([]);
  const [editStockOrderList, setEditStockOrderList] =
    useState<StockOrderAddList | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(0);

  useEffect(() => {
    if (editStockOrderList) {
      setEditQuantity(editStockOrderList.quantity);
    }
  }, [editStockOrderList]);

  useEffect(() => {
    getAddedProducts().then(setList);
  }, []);

  useEffect(() => {
    if (editStockOrderList) {
      setEditQuantity(editStockOrderList.quantity);
    }
  }, [editStockOrderList]);

const handleDelete = async (id: number) => {
  if (confirm("¿Seguro que quieres eliminar este producto?")) {
    const success = await deleteStockOrderAddToList(id); // 👈 usar id
    if (success) {
      setList((prev) => prev.filter((p) => p.id !== id)); // 👈 filtrar por id
    }
  }
};


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

  const handleSaveQuantity = async () => {
    if (!editStockOrderList) return;

    try {
      // 👇 llamada al backend
      await updateStockOrderAddToList(editStockOrderList.productId, {
        quantity: editQuantity,
      });

      // 👇 actualizar en el frontend
      setList((prev) =>
        prev.map((item) =>
          item.id === editStockOrderList.productId
            ? { ...item, quantity: editQuantity }
            : item
        )
      );

      setEditStockOrderList(null); // cerrar modal
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Error al actualizar la cantidad ❌");
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
              className="flex items-center justify-between border rounded-lg px-4 py-2 shadow-sm m-2 transition"
            >
              <span>
                <strong>{item.stockOrder?.name}</strong>
              </span>
              <div className="flex items-center justify-between gap-3 ">
                <button className="p-1 rounded hover:bg-gray-100 transition">
                  <Pencil
                    onClick={() => setEditStockOrderList(item)} // 👈 aquí pasas el producto seleccionado
                    className="w-4 h-4 text-teal-600"
                  />
                </button>
                {editStockOrderList && (
                  <Modal onClose={() => setEditStockOrderList(null)}>
                    <h2 className="text-lg font-bold mb-3">
                      Editar: {item.stockOrder?.name}
                    </h2>

                    <div className="flex items-center gap-2 mb-4">
                      <label className="text-sm font-medium">Cantidad:</label>
                      <input
                        type="number"
                        value={editQuantity}
                        onChange={(e) =>
                          setEditQuantity(Number(e.target.value))
                        }
                        className="border px-2 py-1 rounded w-20"
                      />
                    </div>

                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setEditStockOrderList(null)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveQuantity}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Guardar
                      </button>
                    </div>
                  </Modal>
                )}

<Trash2 
  onClick={() => handleDelete(item.id)} 
  className="w-4 h-4 text-red-500" 
/>                <span>Cantidad: {item.quantity}</span>
              </div>
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
