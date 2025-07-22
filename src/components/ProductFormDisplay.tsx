import type { Product } from "../types";

type ProductFormProps = {
  product?: Product;
  onCancel?: () => void;
};

export const ProductFormDisplay = ({ product, onCancel }: ProductFormProps) => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg">
      {/* Nombre */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-800 mb-1"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={product?.name ?? ""}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 w-full"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded hover:bg-yellow-200 w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};
