import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs
} from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { ProductFormDisplay } from "../components/ProductFormDisplay";
import {
  getProductById,
  updateProduct
} from "../services/ProductService";
import type { Product } from "../types";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      return redirect("/");
      // throw new Response('', {status: 404, statusText: 'No Founded'})
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }
  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect("/productListDisplay");
  }
}

export const EditProduct = () => {
  const product = useLoaderData() as Product;
  const error = useActionData() as string;
  // const { state } = useLocation();

  return (
    <>
      <h2>Editar</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form method="post" className="space-y-4">
       <ProductFormDisplay product={product}/>
      </Form> 
    </>
  );
};
