import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full mx-auto bg-white border-b 2xl:max-w-7xl">
      <div className="relative flex flex-col w-full p-5 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <h1 className="text-3xl font-bold text-gray-900">
            <Link to="/">
              <img
                src={logo}
                alt="Auto negocieAtivo"
                className="h-10 w-20 bg-cover"
              />
            </Link>
          </h1>
          <button
            onClick={toggleMenu}
            className="md:hidden text-3xl text-gray-900 focus:outline-none"
          >
            &#8801; {/* Ícone de menu hamburguer */}
          </button>
        </div>

        {/* Menu para telas médias e maiores */}
        <nav
          className={`${menuOpen ? "block" : "hidden"
            } md:block flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row mt-5`}
        >
          <ul className="md:flex md:space-x-4 items-center">
            <li>
              <a
                href="/carros"
                className="p-2 text-[#282828] hover:text-green-500 font-bold text-[14px] md:text-base"
              >
                Carros
              </a>
            </li>
            <li>
              <a
                href="/motos"
                className="p-2 text-[#282828] hover:text-green-500 font-bold text-[14px] md:text-base"
              >
                Motos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="p-2 text-[#282828] hover:text-green-500 font-bold text-[14px] md:text-base"
              >
                Loja
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="p-2 text-[#282828] hover:text-green-500 font-bold text-[14px] md:text-base"
              >
                Oficina de Dicas
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="p-2 text-[#282828] hover:text-green-500 font-bold text-[14px] md:text-base"
              >
                Contato
              </a>
            </li>
          </ul>
          <Link
            to="/anunciar"
            className="py-[14px] hidden md:block px-[28px] rounded-[8px] bg-[#15803D] text-white hover:bg-[#0F6E0F] font-bold text-[14px] md:text-base ml-5"
          >
            Anunciar
          </Link>
        </nav>
      </div>
    </header>
  );
}
