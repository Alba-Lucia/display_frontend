import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface MenuItem {
  label: string;
  to: string;
  textSize?: string;
}

const menuItems: MenuItem[] = [
  { label: "Inicio", to: "/" },
  { label: "Lista de Productos", to: "/productListDisplay" },
  { label: "Display de Productos", to: "/productListPage" },
  { label: "Product List Category", to: "/ProductListCategory" },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="p-2 focus:outline-none">
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed top-10 right-0 mt-2 w-screen h-screen bg-white opacity-96 border border-gray-200 rounded-lg shadow-lg text-center z-50">
          <div className="flex flex-col justify-center items-center text-center h-full">
            {menuItems.map(({ label, to, textSize = "text-2xl" }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                className={`block px-4 py-3 ${textSize} text-gray-700 hover:bg-gray-100`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
