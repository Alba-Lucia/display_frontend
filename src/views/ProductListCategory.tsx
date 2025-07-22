import { Link } from "react-router-dom";
import { ProductGroupCategory } from "../components/ProductGroupCategory";
import { LayoutGrid, ChevronDown } from "lucide-react";

const chefProducts = [
  { id: 1, name: "Croinsant" },
  { id: 2, name: "Croinsant" },
  { id: 3, name: "Croinsant" },
];

const dessertProducts = [
  { id: 4, name: "Croinsant" },
  { id: 5, name: "Croinsant" },
  { id: 6, name: "Croinsant" },
];

export const ProductListCategory = () => {
  return (
    <div className="max-w-max-w-4xl mx-auto space-y-6 bg-gray-50 min-h-screen text-sm">

      {/* Top actions */}
      <div className="flex items-center justify-between gap-3">
        <button className="flex items-center justify-between border px-3 py-1.5 rounded text-gray-800 w-[65%] hover:bg-gray-100">
          Add new product to list
          <LayoutGrid className="w-4 h-4 ml-2 text-gray-600" />
        </button>
        <Link to="/viewOrdenList" className="flex items-center justify-between border px-3 py-1.5 rounded text-gray-800 w-[35%] hover:bg-gray-100">
          View order list
          <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
        </Link>
      </div>

      <hr className="border-gray-300 border-t my-2" />

      {/* Product Groups */}
      <div className="space-y-6">
        <ProductGroupCategory title="Chef" products={chefProducts} />
        <ProductGroupCategory title="Deserves" products={dessertProducts} />
      </div>
    </div>
  );
};
