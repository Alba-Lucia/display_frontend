import { useEffect, useState } from "react";
import type { StockOrder } from "../types";
import { deleteStockOrder, getStockOrder } from "../services/stockOrderServer";
import { Pencil, Trash2 } from "lucide-react";
import { Modal } from "../modals/Modal";
import StockOrderForm from "./StockOrderForm";
import { addProductToList, getAddedProducts } from "../services/StockOrderAddList";

function StockOrderList({
  refresh,
  setRefresh,
}: {
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [products, setProducts] = useState<StockOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<StockOrder | null>(null);
  const [addedProducts, setAddedProducts] = useState<number[]>([]);

  const handleCloseModal = () => setEditingProduct(null);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     setLoading(true);
  //     const data = await getStockOrder(); // data es StockOrder[]
  //     setProducts(data);
  //     setLoading(false);
  //   }
  //   fetchProducts();
    
  // }, [refresh]);

  useEffect(() => {
  async function fetchProducts() {
    setLoading(true);
    const [allProducts, addedList] = await Promise.all([
      getStockOrder(),   // todos los productos
      getAddedProducts() // productos ya agregados en el backend
    ]);

    setProducts(allProducts);

    // Guardar en estado los IDs de los productos ya añadidos
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setAddedProducts(addedList.map((item: any) => item.productId));

    setLoading(false);
  }
  fetchProducts();
}, [refresh]);

  if (loading) return <p>Cargando productos...</p>;

  const groupedProducts = products.reduce((acc, prod) => {
    const cat = prod.category ?? "Sin categoría"; // fallback
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(prod);
    return acc;
  }, {} as Record<string, typeof products>);

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que quieres eliminar este producto?")) {
      const success = await deleteStockOrder(id);
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    }
  };

  const handleAddToList = async (productId: number, name: string) => {
  const qty = Number(prompt(`Cantidad para ${name}:`, "1"));
  if (!qty || qty <= 0) return;

  try {
    await addProductToList({ productId, quantity: qty });

    // Actualizar estado en memoria
    setAddedProducts((prev) => [...prev, productId]);

    alert(`${name} añadido a la lista ✅`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    alert("Error al añadir producto");
  }
};


  return (
    <div>
      <h1 className="text-2xl font-bold">📦 Lista de productos</h1>
      {products.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <ul>
          {Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h2 className="text-xl font-semibold">{category}</h2>
              <ul>
                {items.map((prod) => (
                  <li
                    key={prod.id}
                    className={`flex items-center justify-between border rounded-lg px-4 py-2 shadow-sm m-2 transition ${
                      addedProducts.includes(prod.id)
                        ? "bg-blue-100 border-blue-400"
                        : "bg-white border-gray-200 hover:shadow"
                    }`}
                  >
                    <p>
                      <strong>{prod.name}</strong>
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="p-1 rounded hover:bg-gray-100 transition">
                        <Pencil
                          onClick={() => setEditingProduct(prod)}
                          className="w-4 h-4 text-teal-600"
                        />
                      </button>
                      {editingProduct && (
                        <Modal onClose={() => setEditingProduct(null)}>
                          <StockOrderForm
                            product={editingProduct}
                            onUpdated={() => {
                              setEditingProduct(null);
                              setRefresh((r) => r + 1);
                              handleCloseModal();
                            }}
                          />
                        </Modal>
                      )}

                      <button className="p-1 rounded hover:bg-gray-100 transition">
                        <Trash2
                          onClick={() => handleDelete(prod.id)}
                          className="w-4 h-4 text-red-500"
                        />
                      </button>
                      <button
                        onClick={() => handleAddToList(prod.id, prod.name)}
                        className={`ml-2 px-3 py-1.5 text-xs font-medium border rounded transition ${
                          addedProducts.includes(prod.id)
                            ? "bg-blue-500 text-white border-blue-600"
                            : "text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {addedProducts.includes(prod.id)
                          ? "Added ✅"
                          : "Add to list"}
                      </button>
                    </div>{" "}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StockOrderList;
