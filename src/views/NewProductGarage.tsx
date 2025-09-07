import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { ProductFormDisplay } from "../components/ProductFormDisplay";
import { addProduct, getProductById } from "../services/ProductService";
import { useEffect } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      return redirect("/");
    }
    return product;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return { error };
  }

  await addProduct(data);

  return { success: true };
}

const NewProductGarage = ({ onCancel }: { onCancel?: () => void }) => {
  const result = useActionData() as { error?: string; success?: boolean };
  const navigate = useNavigate();

  useEffect(() => {
    if (result?.success) {
      navigate("/productListDisplay");
    }
  }, [result, navigate]);

  return (
    <>
      {result?.error && <ErrorMessage>{result.error}</ErrorMessage>}
      <Form method="post" action="/newProductGarage" className="space-y-4">
        <ProductFormDisplay onCancel={onCancel} />
      </Form>
    </>
  );
};

export default NewProductGarage;
