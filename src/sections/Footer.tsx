import { InstagramIcon } from "lucide-react";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";

interface FooterProps {
  show: boolean;
  mt?: number;
  smMt?: number;
}

export function Footer({ show, mt, smMt }: FooterProps) {
  // const scrollToTopLink = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <footer className={`bg-[#1E1E1E] relative mt-${mt} sm:mt-${smMt} w-full`}>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-16 lg:px-8">
        <div
          className={`${
            show ? "block" : "hidden"
          } w-full md:w-[60%] px-6 sm:px-24 absolute top-[-50px] left-1/2 transform -translate-x-1/2 mx-auto flex flex-col items-center gap-4 rounded-lg bg-green-700 p-6 sm:p-8 shadow-lg sm:flex-row sm:justify-evenly`}
        >
          <h2 className={`text-xl font-semibold text-white`}>SIGA A GENTE</h2>
          <ul className="flex gap-4">
            <li>
              <a href="#">
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src={twitter}
                  alt="Twitter"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <InstagramIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 ">
          <div className="text-center sm:text-left">
            <p className="text-white text-[32px] font-semibold leading-10">
              Fale Conosco
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/"
                >
                  (11) 3456-3427
                </a>
              </li>
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/"
                >
                  (11) 94072-3891
                </a>
              </li>
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/"
                >
                  autonegocie@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-white text-[32px] font-semibold leading-10">
              Institucional
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/"
                >
                  Contrato
                </a>
              </li>
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/financiamento"
                >
                  Financiamento
                </a>
              </li>
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/"
                >
                  Anunciar meu veículo
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-white text-[32px] font-semibold leading-10">
              Dúvidas
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/"
                >
                  Regras Gerais
                </a>
              </li>
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/"
                >
                  Sugestão de Melhorias
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-white text-[32px] font-semibold leading-10">
              Administradores
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  className="text-white   text-[16px] font-light leading-5 hover:text-green-800"
                  href="/admin"
                >
                  Área de administração
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-white text-sm mt-24 sm:mt-32">
        <p className="px-4 sm:px-8">
          AutoNegocie - Somos um site especializado em marketing digital para
          veículos usados, atendemos as regiões de São Paulo, conforme anunciado
          no site com matriz online.
        </p>
        <p className="mt-4 sm:mt-6">
          Copyright © 2023 AutoNegocie. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
