import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { updateProductInList } from "../services/productList";

const API_URL = import.meta.env.VITE_API_URL;

interface Product {
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

const formatDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("T")[0].split("-").map(Number);
  const localDate = new Date(year, month - 1, day);
  return localDate.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
  });
};

const calculateStatusLabel = (createdAt: string): string => {
  const today = new Date();
  const createdDate = new Date(createdAt);
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const createdMidnight = new Date(
    createdDate.getFullYear(),
    createdDate.getMonth(),
    createdDate.getDate()
  );
  const diffTime = todayMidnight.getTime() - createdMidnight.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Próximo";
  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Hoy";
  if (diffDays === 2) return "1 día";
  if (diffDays === 3) return "2 días";
  if (diffDays === 4) return "3 días";
  if (diffDays === 5) return "Último día";
  return "Vencido";
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Vencido":
      return "bg-red-100 text-red-700";
    case "Último día":
      return "bg-yellow-100 text-yellow-700";
    case "Hoy":
    case "1 día":
    case "2 días":
    case "3 días":
      return "bg-blue-100 text-blue-700";
    case "Próximo":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const ProductListPage = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
  const [editedDate, setEditedDate] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product-list`);
        if (!Array.isArray(response.data)) {
          console.error("❌ La respuesta no es un array:", response.data);
          setProductList([]);
        } else {
          setProductList(response.data);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductList();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Eliminar este producto?")) return;

    try {
      await axios.delete(`${API_URL}/api/product-list/${id}`);
      setProductList((prev) => prev.filter((item) => item.id !== id));
      toast.success("Producto eliminado");
    } catch (error) {
      console.error("Error eliminando:", error);
      toast.error("No se pudo eliminar");
    }
  };

  const openEditModal = (item: Product) => {
    setSelectedProduct(item);
    setEditedQuantity(item.quantity);
    setEditedDate(item.createdAt.split("T")[0]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveEdit = async () => {
    if (!selectedProduct) return;

    try {
      await updateProductInList(selectedProduct.id, {
        quantity: editedQuantity,
        createdAt: editedDate,
      });

      setProductList((prev) =>
        prev.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, quantity: editedQuantity, createdAt: editedDate }
            : item
        )
      );

      toast.success("Producto actualizado");
      closeModal();
    } catch (error) {
      console.error("Error al editar:", error);
      toast.error("No se pudo actualizar");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        📋 Lista de productos asignados
      </h1>
      <Link to="/" className="text-blue-600 mb-4 inline-block">
        ← Regresar
      </Link>

      <div className="grid grid-cols-4 text-m font-semibold text-gray-600 mb-3 p-4 bg-gray-200 rounded-sm ">
        <div>Producto</div>
        <div className="text-center">Cantidad</div>
        <div className="text-center">Fecha</div>
        <div className="text-center">Estado</div>
      </div>

      <div className="space-y-2">
        {productList.map((item) => {
          const statu = calculateStatusLabel(item.createdAt);
          return (
            <div
              key={item.id}
              className="rounded-2xl border bg-white border-gray-300 p-4 grid grid-cols-4 items-center text-sm text-gray-700 relative group hover:shadow-sm"
            >
              <div className="font-medium">{item.product.name}</div>
              <div className="text-center">
                {item.quantity} {item.product.unit || "un"}
              </div>
              <div className="text-center">{formatDate(item.createdAt)}</div>
              <div className="text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    statu
                  )}`}
                >
                  {statu}
                </span>
              </div>

              <div className="absolute right-4">
                <button
                  className="peer text-xl px-2 cursor-pointer"
                  onClick={toggleMenu}
                >
                  ⁝
                </button>
                {isOpen && (
                  <div className="hidden peer-hover:flex hover:flex flex-col absolute right-0 top-6 bg-white border border-gray-300 rounded-md shadow-md z-10">
                    <button
                      className="px-4 py-2 text-sm hover:bg-gray-100 text-left"
                      onClick={() => openEditModal(item)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-4 py-2 text-sm hover:bg-gray-100 text-left text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
      </div>

      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">
              Editar: {selectedProduct.product.name}
            </h2>

            <div className="mb-3">
              <label className="block mb-1 text-sm text-gray-600">
                Cantidad:
              </label>
              <input
                type="number"
                value={editedQuantity}
                onChange={(e) => setEditedQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-600">
                Fecha de asignación:
              </label>
              <input
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 w-full"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded hover:bg-yellow-200 w-full"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      <p>Actualizar</p>
    </div>

  );
};

export default ProductListPage;
