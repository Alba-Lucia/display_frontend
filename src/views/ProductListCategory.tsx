import { ChevronDown, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import StockOrderForm from "../components/StockOrderForm";
import StockOrderList from "../components/StockOrderList";
import { Modal } from "../modals/Modal";

export const ProductListCategory = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refresh, setRefresh] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="max-w-max-w-4xl mx-auto space-y-6 bg-gray-50 min-h-screen text-sm">
      {/* Top actions */}

      <div className="flex items-center justify-between gap-3">
        <button
          className="flex items-center justify-between border px-3 py-1.5 rounded text-gray-800 w-[65%] hover:bg-gray-100"
          onClick={handleOpenModal}
        >
          Add new product to
          <LayoutGrid className="w-4 h-4 ml-2 text-gray-600" />
        </button>

        <Link
          to="/stockOrderListPage"
          className="flex items-center justify-between border px-3 py-1.5 rounded text-gray-800 w-[35%] hover:bg-gray-100"
        >
          View order list
          <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
        </Link>
      </div>

      <hr className="border-gray-300 border-t my-2" />
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      {/* Product Groups */}
      <div className="space-y-6">
        <StockOrderList refresh={refresh} setRefresh={setRefresh} />
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <StockOrderForm
            onCreated={() => {
              setRefresh((r) => r + 1);
              handleCloseModal(); // cierra modal
            }}
          />
        </Modal>
      )}
    </div>
  );
};
