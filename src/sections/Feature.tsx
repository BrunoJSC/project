import people from "../assets/people.svg";
import hand from "../assets/hand.svg";
import percent from "../assets/percent.svg";
import plus from "../assets/plus.svg";
import { Card } from "../components/Card";

export function Feature() {
  return (
    <section className="bg-white text-black w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="w-full text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#1E1E1E]">
            A melhor plataforma de negociação de veículos
          </h2>

          <p className="mt-4 text-center mx-auto md:w-[648px] text-[#848484] text-base md:text-lg font-normal">
            A AutoNegocie revolucionou a maneira como as pessoas compram e
            vendem veículos. Como uma plataforma{" "}
            <span className="text-[#15803D]">inovadora</span>, ela se destaca
            por sua abordagem eficiente e segura de conectar{" "}
            <span className="text-[#15803D]">compradores</span> e{" "}
            <span className="text-[#15803D]">vendedores</span>.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card
            img={people}
            title="Avaliação"
            text="Avalie seu veículo de forma rápida e segura com a garantia de uma empresa com mais de 20 anos de experiência no mercado."
          />

          <Card
            img={hand}
            title="Negociação"
            text="Negocie seu veículo com segurança e rapidez, com a garantia de uma empresa com mais de 20 anos de experiência no mercado."
          />

          <Card
            img={percent}
            title="Compra"
            text="Compre seu veículo com segurança e rapidez, com a garantia de uma empresa com mais de 20 anos de experiência no mercado."
          />

          <Card
            img={plus}
            title="Vantagens"
            text="Descubra as vantagens de usar a nossa plataforma para comprar e vender veículos."
          />
        </div>
      </div>
    </section>
  );
}
