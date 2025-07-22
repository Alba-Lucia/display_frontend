import { ProductCardCategory } from "./ProductCardCategory";

type ProductGroupProps = {
  title: string;
  products: { id: number; name: string }[];
};

export const ProductGroupCategory = ({
  title,
  products,
}: ProductGroupProps) => {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductCardCategory
            key={product.id}
            name={product.name}
            onEdit={() => console.log("Edit", product.id)}
            onDelete={() => console.log("Delete", product.id)}
            onAddToList={() => console.log("Add to list", product.id)}
          />
        ))}
      </div>
    </div>
  );
};
