// components/EditModal.tsx
import React from "react";

interface EditModalProps {
  productName: string;
  quantity: number;
  createdAt: string;
  onQuantityChange: (value: number) => void;
  onDateChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  productName,
  quantity,
  createdAt,
  onQuantityChange,
  onDateChange,
  onClose,
  onSave,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Edita: {productName}</h2>

        <div className="mb-3">
          <label className="block mb-1 text-sm text-gray-600">Cantidad:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
            className="border rounded px-3 py-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-600">
            Fecha de asignación:
          </label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => onDateChange(e.target.value)}
            className="border rounded px-3 py-1 w-full"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
 className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 w-full"
          >          
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded hover:bg-yellow-200 w-full"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
