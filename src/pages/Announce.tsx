import { Header } from "../components/Header";
import { Layout } from "../layout/Layout";
import { Footer } from "../sections/Footer";

import CarSVG from "../assets/Svg Carro.png";

interface CardProps {
  title: string;
  text: string;
}

function Card({ text, title }: CardProps) {
  return (
    <div className="w-full md:w-[600px] mb-5 ">
      <h2 className="text-lg md:text-xl font-bold">{title}</h2>
      <p className="text-gray-600 text-sm md:text-base font-normal">{text}</p>
    </div>
  );
}

export function Announce() {
  return (
    <div>
      <Header />
      <Layout className="min-h-screen">
        <div className="max-w-screen-lg mx-auto mb-5 px-4">
          <h1 className="text-[#1E1E1E] text-xl md:text-2xl font-bold mt-5">
            O que é AutoNegocie?
          </h1>
          <p className="text-[#848484] text-sm md:text-base font-normal mt-5">
            O AutoNegocie é uma plataforma especializada em negociação de
            veículos, fornecendo uma gama de ferramentas de comunicação e
            recursos de negócios que agilizam o processo de venda do seu carro.
          </p>
        </div>
        <div className="max-w-screen-lg mx-auto h-auto relative">
          <div className="max-w-screen-lg mx-auto h-auto rounded-lg p-4 bg-gradient-to-r from-[#1E1E1E] to-transparent bg-green-100">
            <Card
              title="Ampla Audiência de Potenciais Compradores"
              text="Ao anunciar seu carro no site AutoNegocie, você terá acesso a uma ampla base de potenciais compradores interessados em adquirir veículos. Isso aumenta suas chances de encontrar um comprador rapidamente e fechar um bom negócio."
            />

            <Card
              title="Visibilidade e Abrangência Nacional"
              text="Ao anunciar seu carro no site AutoNegocie, você terá acesso a uma ampla base de potenciais compradores interessados em adquirir veículos. Isso aumenta suas chances de encontrar um comprador rapidamente e fechar um bom negócio."
            />

            <Card
              title="Visibilidade e Abrangência Nacional"
              text="O site AutoNegocie tem alcance nacional, o que significa que seu anúncio será visto por pessoas de diferentes regiões do país. Isso proporciona uma maior visibilidade para o seu carro e aumenta as chances de encontrar um comprador mesmo fora da sua localidade."
            />

            <Card
              title="Simplicidade e Conveniência"
              text="Ao utilizar o AutoNegocie, você poderá criar seu anúncio de forma rápida e simples. O processo é intuitivo e permite que você adicione fotos, descrições detalhadas e informações relevantes sobre o seu carro. Além disso, você terá acesso a ferramentas de comunicação para interagir diretamente com os interessados."
            />

            <Card
              title="Avaliação Transparente e Equitativa"
              text="O AutoNegocie oferece ferramentas de avaliação para estimar o valor do seu carro com base em critérios de mercado. Isso proporciona uma avaliação justa e transparente, ajudando você a definir um preço adequado para o seu veículo e atrair compradores que estejam dispostos a pagar o valor justo."
            />

            <Card
              title="Transações Seguras"
              text="O site AutoNegocie possui medidas de segurança para proteger tanto os compradores quanto os vendedores. Transações seguras e confiáveis são facilitadas por meio de mecanismos de verificação de identidade, histórico do veículo e opções de pagamento seguro, garantindo uma negociação tranquila."
            />
          </div>

          <a
            className="mt-16 block w-full mb-11 md:w-[400px] rounded bg-green-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500"
            href="/form"
          >
            Faça seu anúncio com a gente
          </a>
          <img
            src={CarSVG}
            alt=""
            className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[200px] md:h-[400px] hidden md:block"
          />
        </div>
      </Layout>
      <Footer show={true} mt={6} smMt={32} />
    </div>
  );
}
