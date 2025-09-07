import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import { fetchProducts } from "../services/ProductService";
import ProductSearchForm from "./ProductSearchForm";

export default function ProductsPageSearchForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [q, setQ] = useState("pan"); // ejemplo inicial
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function load() {
      const result = await fetchProducts(q, page, pageSize);
      setProducts(result.data);
      setTotal(result.total);
    }
    load();
  }, [q, page, pageSize]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Productos</h1>

      <SearchForm onSearch={(query) => { setQ(query); setPage(1); }} />

      <ProductSearchForm products={products} />

      <div className="mt-4 flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          disabled={page * pageSize >= total}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
