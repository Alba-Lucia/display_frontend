import { Link, Outlet, useLocation } from "react-router-dom";
import { EditProduct } from "../views/EditProduct";
import HamburgerMenu from "../components/HamburgerMenu";

export const Layout = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <div className=" bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Link to="/">
            <img src="/logo.svg" alt="Logo" className="w-18" />
          </Link>
          <HamburgerMenu />
        </div>
      </div>
      <main className="bg-gray-50 p-3 ">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
      {/* Mostrar modal si viene desde un fondo */}
      {state?.backgroundLocation &&
        location.pathname.includes("/products/") && <EditProduct />}
    </>
  );
};
