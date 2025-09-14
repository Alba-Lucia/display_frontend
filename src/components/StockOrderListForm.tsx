import { StockOrderAddListSchema, type StockOrderAddList, type StockOrderAddLists } from "../types";
import { addProductToList } from "../services/StockOrderAddList";
import { parse } from "valibot"; // función para validar datos con tu schema
import { useState } from "react";

export default function StockOrderListForm() {
  const [productId, setProductId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedProducts, setAddedProducts] = useState<StockOrderAddLists>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validar datos con Valibot antes de enviar
      const validatedData: StockOrderAddList = parse(StockOrderAddListSchema, {
        productId,
        quantity,
        listDate: new Date().toISOString().split("T")[0],
        created: true, // asumimos que se va a crear
      });

      // Llamada al backend
      const newProduct = await addProductToList({
        productId: validatedData.productId,
        quantity: validatedData.quantity,
      });

      setAddedProducts((prev) => [...prev, newProduct]);
      setProductId(0);
      setQuantity(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to add product");
    }
  };

  return (
    <div className="p-4 border rounded-md w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label>
          Product ID:
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(Number(e.target.value))}
            className="border p-1 rounded w-full"
            required
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-1 rounded w-full"
            min={1}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>

      {addedProducts.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Added Products:</h3>
          <ul className="flex flex-col gap-1">
            {addedProducts.map((p) => (
              <li
                key={p.productId}
                className={`p-2 border rounded ${
                  p.created ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                Product ID: {p.productId} | Quantity: {p.quantity} | Date: {p.listDate}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


