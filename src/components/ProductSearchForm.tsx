type Product = {
  id: number;
  name: string;
  sku?: string;
  quantity: number;
};

type Props = {
  products: Product[];
};

export default function ProductSearchForm({ products }: Props) {
  if (products.length === 0) {
    return <p>No hay productos encontrados.</p>;
  }

  return (
    <ul className="space-y-2">
      {products.map((p) => (
        <li key={p.id} className="border p-2 rounded">
          <strong>{p.name}</strong> (SKU: {p.sku ?? "N/A"}) - Cantidad: {p.quantity}
        </li>
      ))}
    </ul>
  );
}
