// src/components/ProductListDisplay.tsx
import { useEffect, useState } from "react";
import { Modal } from "../modals/Modal";
import { getProduct } from "../services/ProductService";
import type { Product } from "../types";
import NewProductGarage from "../views/NewProductGarage";
import { ProductDetailsDisplay } from "../views/ProductDetailsDisplay";

export async function loader() {
  const products = await getProduct();
  return products;
}

const ProductListDisplay = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async () => {
    const products = await getProduct();
    setProduct(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (!product || product.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Product list display b</h2>
          <button
            onClick={handleOpenModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Agregar producto
          </button>
        </header>
        <p className="text-center text-gray-500">
          No hay productos disponibles.
        </p>
        {showModal && (
          <Modal onClose={handleCloseModal}>
            <NewProductGarage onCancel={handleCloseModal} />
          </Modal>
        )}
      </div>
    );
  }

  return (
    <div className=" mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Product list display</h2>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Agregar producto
        </button>
      </div>

      <div className="space-y-2">
        {product.map((p) => (
          <ProductDetailsDisplay
            key={p.id}
            p={p}
            onProductAdded={fetchProducts}
          />
        ))}
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <NewProductGarage onCancel={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default ProductListDisplay;
