import { Banner } from "../components/Banner";
import { Header } from "../components/Header";
import { Layout } from "../layout/Layout";
import { Footer } from "../sections/Footer";
import whatsappImg from "../assets/whatsapp.svg";
import facebook from "../assets/icons/facebook-green.svg";
import twitter from "../assets/icons/twitter-green.svg";
import { Instagram } from "lucide-react";

export function Contact() {
  return (
    <div>
      <Header />
      <Layout className="min-h-screen">
        <Banner
          img="bg-banner2"
          title="Adoraríamos falar com você!"
          text="Preencha com seus dados logo abaixo"
          show={false}
        />

        <div className="border-t border-green-700 mx-auto w-full max-w-[992px] mt-10"></div>

        <div className="max-w-6xl mx-auto mt-6 p-4 sm:p-6 lg:p-10 flex flex-col sm:flex-row justify-around items-center">
          <form className="mx-auto flex flex-col justify-between mt-6 p-4 sm:p-6 w-full sm:w-[600px] lg:w-[500px] h-[610px] rounded-lg">
            <div>
              <label
                htmlFor="name"
                className="block text-[#1E1E1E] text-lg font-bold"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                className="w-full px-2 py-3 mt-2 bg-[#15803D29] rounded-lg"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-[#1E1E1E] text-lg font-bold"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-2 py-3 mt-2 bg-[#15803D29] rounded-lg"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="message"
                className="block text-[#1E1E1E] text-lg font-bold"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                className="w-full h-32 p-2 mt-2 bg-[#15803D29] rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 text-lg bg-green-600 text-white font-bold rounded-lg"
            >
              Enviar
            </button>
          </form>

          <div className="w-full mt-6 sm:mt-0 lg:w-[343px] h-[610px] rounded-lg">
            <div className="p-4">
              <h3 className="text-[#1E1E1E] text-lg font-semibold">Dúvidas?</h3>
              <p className="mt-2 text-[#848484] text-base font-normal">
                Chame no WhatsApp através do botão abaixo para ser atendido por
                um de nossos especialistas!
              </p>
              <button className="mt-4 bg-[#E6E6E6] text-[#15803D] text-base font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300 active:bg-gray-400">
                <img src={whatsappImg} alt="" className="w-6 h-6" />
                Chamar no WhatsApp
              </button>
            </div>

            <div className="p-4 mt-6">
              <h3 className="text-lg font-semibold leading-10">Contato</h3>
              <ul className="mt-2 text-sm">
                <li className="text-[#7C7C7C] font-normal mb-3">
                  (11) 3456-3427
                </li>
                <li className="text-[#7C7C7C] font-normal mb-3">
                  (11) 94072-3891
                </li>
                <li className="text-[#7C7C7C] font-normal">
                  autonegocie@gmail.com
                </li>
              </ul>
            </div>

            <div className="p-4 mt-6">
              <h3 className="text-lg font-semibold leading-10">
                Redes Sociais
              </h3>
              <ul className="mt-2 text-sm">
                <li className="text-[#7C7C7C] font-normal mb-3  flex items-center gap-2 p-2 rounded-lg">
                  <img src={facebook} alt="" />
                  Facebook
                </li>
                <li className="text-[#7C7C7C] font-normal mb-3  flex items-center gap-2 p-2 rounded-lg">
                  <img src={twitter} alt="" />
                  Twitter
                </li>
                <li className="text-[#7C7C7C] font-normal mb-3  flex items-center gap-2 p-2 rounded-lg">
                  <Instagram className="text-green-700" />
                  Instagram
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-green-700 mx-auto w-full max-w-[992px] mt-10 mb-16"></div>
      </Layout>
      <Footer show={false} />
    </div>
  );
}
