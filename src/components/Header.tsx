import { Link } from "react-router-dom";
import logo from "../assets/favicon/Icon.png";

export function Header() {
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
        </div>

        <nav className="hidden flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
          <a
            href="/carros"
            className="p-2 text-[#282828] hover:text-green-500 font-bold text-[14px] md:text-base"
          >
            Carros
          </a>
          <a
            href="#"
            className="p-2 text-[#282828] hover:text-green-500 font-bold text-[14px] md:text-base"
          >
            Motos
          </a>
          <a
            href="#"
            className="p-2 text-[#282828] hover:text-green-500 font-bold text-[14px] md:text-base"
          >
            Loja
          </a>
          <Link
            to="/contact"
            className="p-2 text-[#282828] hover:text-green-500 font-bold text-[14px] md:text-base"
          >
            Contato
          </Link>

          <a
            href="#"
            className="p-2 text-[#282828] hover:text-green-500 font-bold text-[14px] md:text-base"
          >
            Oficina de dicas
          </a>
        </nav>
        <Link
          to="/anunciar"
          className="py-[14px] hidden md:block px-[28px] rounded-[8px] bg-[#15803D] text-white hover:bg-[#0F6E0F] font-bold text-[14px] md:text-base ml-5"
        >
          Anunciar
        </Link>
      </div>
    </header>
  );
}
