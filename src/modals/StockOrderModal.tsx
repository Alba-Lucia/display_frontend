type Props = {
  name: string;
  category: string;
  onChange: (value: number) => void;
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

const StockOrderModal = ({
  name,
  category,
  onCancel,
  onConfirm,
  onClose,
}: Props) => {
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

        <div className="flex items-center justify-center mb-5">
          <label className="block text-sm mb-2">{name}</label>
          <label className="block text-sm mb-2">{category}</label>
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

export default StockOrderModal;
