import {
  array,
  boolean,
  nullable,
  number,
  object,
  string,
  type InferOutput,
  optional,
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
