import {
  array,
  boolean,
  custom,
  nullable,
  number,
  object,
  optional,
  string,
  type InferOutput,
} from "valibot";

export const DraftProductSchema = object({
  name: string(),
});

export const ProductSchema = object({
  id: number(),
  name: string(),
  quantity: optional(nullable(number())),
  unit: optional(nullable(string())),
  expirationDate: optional(nullable(string())),
  addedToday: optional(boolean()),
  statusLabel: optional(nullable(string())),
});

export const ProductsSchema = array(ProductSchema);
export type Product = InferOutput<typeof ProductSchema>;

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const dateString = custom<string>((value) => {
  if (typeof value !== "string") return false;
  if (!dateRegex.test(value)) return false;

  const date = new Date(value);
  return !isNaN(date.getTime());
}, "fecha inválida");

export const ProductSchemas = object({
  name: custom(
    (value) => typeof value === "string" && value.length > 0,
    "nombre inválido"
  ),
  expirationDate: dateString,
  inDisplay: optional(
    nullable(custom((value) => typeof value === "boolean", "debe ser booleano"))
  ),
});

export const ProductListSchema = object({
  productId: number(),
  product: ProductSchema,
  quantity: number(),
  createdAt: dateString,
});

export const ProductListsSchema = array(ProductListSchema);
export type ProductList = InferOutput<typeof ProductListSchema>;
