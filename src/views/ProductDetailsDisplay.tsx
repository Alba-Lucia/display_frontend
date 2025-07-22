import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Form, redirect, type ActionFunctionArgs } from "react-router-dom";
import { ProductFormDisplay } from "../components/ProductFormDisplay";
import { Modal } from "../modals/Modal";
import ModalAddDisplay from "../modals/ModalAddDisplay";
import { deleteProduct } from "../services/ProductService";
import type { Product } from "../types";
import { addProductToList } from "../services/productList";

type ProductDetailsProps = {
  p: Product;
  onProductAdded?: () => void; // 👈 se llama después de agregar
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/productListDisplay");
  }
}

export const ProductDetailsDisplay = ({
  p,
  onProductAdded,
}: ProductDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex justify-between items-center bg-white py-2 px-4 rounded-2xl border border-gray-300">
      <span>{p.name}</span>

      <div className="flex items-center gap-2">
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="w-5 h-5" />
        </button>

        {/* Eliminar */}
        <Form method="POST" action={`/products/${p.id}/eliminar`}>
          <button type="submit" className="text-red-600 hover:text-red-800">
            <Trash2 className="w-5 h-5" />
          </button>
        </Form>

        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Add to list
        </button>
      </div>

      {/* Modal para editar */}
      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <h2 className="text-lg font-semibold mb-4">Editar producto</h2>
          <Form
            method="post"
            action={`/products/${p.id}/edit`}
            onSubmit={() => setIsEditing(false)}
          >
            <ProductFormDisplay
              product={p}
              onCancel={() => setIsEditing(false)}
            />
          </Form>
        </Modal>
      )}

      {/* Modal para agregar a la lista */}
      {showModal && (
        <ModalAddDisplay
          productName={p.name}
          quantity={quantity}
          onChange={(value) => setQuantity(Math.max(1, value))}
          onCancel={() => setShowModal(false)}
          onConfirm={async () => {
            const data = {
              productId: p.id,
              quantity: quantity,
              created_at: new Date().toISOString(),
            };

            try {
              const result = await addProductToList(data);
              console.log("Producto agregado a la lista:", result);
              alert("Producto agregado a la lista");

              if (onProductAdded) {
                onProductAdded();
              }
            } catch (error) {
              console.error("Error al agregar producto a la lista", error);
              alert("Error al agregar producto a la lista");
            } finally {
              setShowModal(false);
            }
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
