export type ProductTableItem = {
  id: number;
  name: string;
  unit: string;
  date: string;
  status: "expired" | "last_day" | "one_day";
};

interface Props {
  products: ProductTableItem[];
}

const statusStyles = {
  expired: "bg-red-100 text-red-700",
  last_day: "bg-yellow-100 text-yellow-700",
  one_day: "bg-blue-100 text-blue-700",
};

const statusLabels = {
  expired: "Vencido",
  last_day: "Last day",
  one_day: "1 Day",
};

const ProductTable: React.FC<Props> = ({ products }) => (
  <div className="max-w-4xl mx-auto p-4">
    <div className="hidden md:block">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead className="bg-gray-200 rounded-md">
          <tr className="flex w-full">
            <th className="p-2 font-medium flex-[4]">Product</th>
            <th className="p-2 font-medium flex-[1] text-center">Unit</th>
            <th className="p-2 font-medium flex-[1] text-center">Date</th>
            <th className="p-2 font-medium flex-[2] text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="flex w-full bg-white shadow rounded my-1">
              <td className="p-2 flex-[4]">{p.name}</td>
              <td className="p-2 flex-[1] text-center">{p.unit}</td>
              <td className="p-2 flex-[1] text-center">{p.date}</td>
              <td className="p-2 flex-[2] text-center">
                <span
                  className={`block text-sm px-4 py-1 rounded-full ${
                    statusStyles[p.status]
                  }`}
                >
                  {statusLabels[p.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="block md:hidden space-y-3">
      {products.map((p) => (
        <div key={p.id} className="bg-white p-4 rounded shadow space-y-1">
          <div>
            <span className="font-semibold">Product:</span> {p.name}
          </div>
          <div>
            <span className="font-semibold">Unit:</span> {p.unit}
          </div>
          <div>
            <span className="font-semibold">Date:</span> {p.date}
          </div>
          <div>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`inline-block mt-1 text-sm px-3 py-1 rounded-full ${
                statusStyles[p.status]
              }`}
            >
              {statusLabels[p.status]}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProductTable;
