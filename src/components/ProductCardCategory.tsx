import { Pencil, Trash2 } from "lucide-react";

type ProductCardProps = {
  name: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddToList?: () => void;
};

export const ProductCardCategory = ({
  name,
  onEdit,
  onDelete,
  onAddToList,
}: ProductCardProps) => {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow transition">
      <span className="text-gray-800 text-sm">{name}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="p-1 rounded hover:bg-gray-100 transition"
        >
          <Pencil className="w-4 h-4 text-teal-600" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 rounded hover:bg-gray-100 transition"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
        <button
          onClick={onAddToList}
          className="ml-2 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          Add to list
        </button>
      </div>
    </div>
  );
};
