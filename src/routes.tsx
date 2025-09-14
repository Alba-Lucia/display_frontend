import { createBrowserRouter } from "react-router-dom";
import ProductListDisplay, {
  loader as ProductDisplayLoader,
} from "./components/ProductListDisplay";
import { Layout } from "./layouts/Layout";
import {
  EditProduct,
  action as editProductAction,
  loader as editProductLoader,
} from "./views/EditProduct";
import Home from "./views/Home";
import NewProductGarage, {
  action as productFormAction,
} from "./views/NewProductGarage";
import { action as deleteProductAction } from "./views/ProductDetailsDisplay";
import { ProductListCategory } from "./views/ProductListCategory";
import ProductListPage from "./views/ProductListPage";
import StockOrderListPage from "./views/StockOrderListPage";
import { ViewOrdenList } from "./views/ViewOrdenList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "productListDisplay",
        element: <ProductListDisplay />,
        loader: ProductDisplayLoader,
      },
      {
        path: "newProductGarage",
        element: <NewProductGarage />,
        action: productFormAction,
      },
      {
        path: "products/:id/edit",
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "products/:id/eliminar",
        action: deleteProductAction,
      },
     
      {
        path: "productListPage",
        element: <ProductListPage />,
      },
      // Category
      {
        path: "ProductListCategory",
        element: <ProductListCategory />,
      },
      {
        path: "viewOrdenList",
        element: <ViewOrdenList />,
      },
       {
        path: "stockOrderListPage",
        element: <StockOrderListPage />,
      },
    ],
  },
]);
