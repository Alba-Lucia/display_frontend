import { useEffect, useState } from "react";
import { createProduct, updateStockOrder } from "../services/stockOrderServer";
import type { StockOrder } from "../types";

export default function StockOrderForm({
  onCreated,
  product,
  onUpdated,
}: {
  onCreated?: () => void;
  product?: StockOrder | null;
  onUpdated?: () => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");

  const categories = [
    "Barra",
    "Bebidas",
    "Cocina",
    "Chef",
    "Suministros",
    "Vegetales",
    "Pasteleria",
  ];

  // Si estamos editando, rellenar campos
  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category ?? "");
      setSku(product.sku ?? "");
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (product) {
      // 🔄 EDITAR
      const updated = await updateStockOrder(product.id, {
        name,
        category,
        sku,
      });
      if (updated && onUpdated) {
        onUpdated();
      }
    } else {
      // 🆕 CREAR
      await createProduct({ name, category, sku });
      setName("");
      setCategory("");
      setSku("");
      if (onCreated) {
        onCreated();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        className="border p-2 rounded w-full"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {product ? "Actualizar producto" : "Crear producto"}
      </button>
    </form>
  );
}
