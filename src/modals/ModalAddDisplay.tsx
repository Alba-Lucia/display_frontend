// src/components/AddToStoreModal.tsx
type Props = {
  productName: string;
  quantity: number;
  onChange: (value: number) => void;
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

const ModalAddDisplay = ({
  productName,
  quantity,
  onChange,
  onCancel,
  onConfirm,
  onClose,
}: Props) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onChange(quantity + 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-md w-80 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4">Agregar a tienda</h2>

        <label className="block text-sm mb-2">{productName}</label>

        <div className="flex items-center justify-center mb-5">
          <button
            className="px-3 py-1 text-xl text-gray-600 bg-gray-100 rounded-l hover:bg-gray-200"
            onClick={handleDecrement}
          >
            −
          </button>
          <input
            type="number"
            className="border px-2 py-1 rounded"
            value={quantity}
            min={1}
            onChange={(e) => onChange(Number(e.target.value))}
          />

          <button
            className="px-3 py-1 text-xl text-gray-600 bg-gray-100 rounded-r hover:bg-gray-200"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>

        <div className="flex justify-between gap-3">
          <button
            onClick={onCancel}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 w-full"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded hover:bg-yellow-200 w-full"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddDisplay;
