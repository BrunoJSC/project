import { Summary } from "../components/Summary";

export function FAQ() {
  return (
    <section className="bg-white text-black w-full mb-24">
      <div className="max-w-screen-xl mx-auto px-4 py-8 sm:py-12 md:px-6 lg:px-8">
        <div className="w-full text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#1E1E1E]">
            Perguntas Frequentes sobre a plataforma
          </h2>
        </div>

        <div className="flow-root mt-10 max-w-screen-md mx-auto">
          <div className="-my-8 divide-y divide-gray-100">
            <Summary
              title="1. Quais são os horários de funcionamento da  concessionária?"
              text="Nossos atendentes estão disponíveis 24 horas por dia, 7 dias por semana."
            />

            <Summary
              title="2. Como posso entrar em contato em caso de emergências fora do horário comercial?"
              text="AutoNegocie é uma plataforma de negociação de veículos."
            />

            <Summary
              title="3. Posso agendar um test drive?"
              text="AutoNegocie é uma plataforma de negociação de veículos."
            />

            <Summary
              title="4. Quais são as opções de financiamento disponíveis?"
              text="AutoNegocie é uma plataforma de negociação de veículos."
            />

            <Summary
              title="5. Vocês aceitam trocas?"
              text="AutoNegocie é uma plataforma de negociação de veículos."
            />

            <Summary
              title="6. Quais serviços de pós-venda vocês oferecem?"
              text="AutoNegocie é uma plataforma de negociação de veículos."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
