import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes";
import { Toaster } from "react-hot-toast";
import { StockOrderProvider } from "./context/StockOrderContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StockOrderProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </StockOrderProvider>
  </StrictMode>
);
