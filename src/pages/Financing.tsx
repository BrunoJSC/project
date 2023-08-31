import { Header } from "../components/Header";
import { Layout } from "../layout/Layout";
import { Footer } from "../sections/Footer";
import finance from "../assets/finance.png";

interface CardProps {
  title: string;
  text: string;
}

function Card({ title, text }: CardProps) {
  return (
    <div className="w-full md:w-[600px] mb-5">
      <h2 className="text-lg md:text-xl font-bold">{title}</h2>
      <p className="text-gray-600 text-sm md:text-base font-normal">{text}</p>
    </div>
  );
}

export function Financing() {
  return (
    <div>
      <Header />
      <Layout className="min-h-screen">
        <div className="max-w-screen-md mx-auto mt-5 mb-64 relative">
          <h1 className="text-[#1E1E1E] text-xl md:text-2xl font-bold">
            Financiamento
          </h1>
          <div className="mx-auto bg-green-200 rounded-lg p-4 relative">
            <Card
              title="Parceria com os principais bancos"
              text="Através de parcerias com os principais bancos do país, oferecemos as melhores taxas de juros e condições de financiamento."
            />

            <Card
              title="Facilidade na aprovação do crédito"
              text="Temos processos simplificados de aprovação de crédito para agilizar o financiamento do seu veículo."
            />

            <Card
              title="Buscamos a melhor taxa de juros possível"
              text="Nossa equipe está empenhada em encontrar a melhor taxa de juros para o seu perfil financeiro."
            />

            <Card
              title="Plano CDC (plano de desconto na antecipação de parcelas)"
              text="Oferecemos o Plano CDC, que permite descontos na antecipação de parcelas do financiamento."
            />

            <Card
              title="Assinatura de contrato online"
              text="O processo de assinatura do contrato é realizado de forma simples e conveniente através da nossa plataforma online."
            />

            <Card
              title="Aprovação online"
              text="Todo o processo de aprovação do financiamento é feito online, proporcionando comodidade e agilidade."
            />

            <Card
              title="Primeira parcela para 30 dias"
              text="Você pode escolher começar a pagar a primeira parcela do financiamento somente após 30 dias."
            />
          </div>
          <button className="bg-[#15803D] hover:bg-green-800 active:bg-green-900 text-white rounded-lg px-4 py-3 mt-5 text-lg md:text-xl font-bold">
            Solicitar Financiamento
          </button>

          <div className="mt-10 w-full md:w-[300px]">
            <h2>Dúvidas?</h2>
            <p className="text-[#848484] text-sm md:text-base font-normal">
              Chame no WhatsApp através do botão abaixo para ser atendido por um
              de nossos especialistas!
            </p>
            <button className="bg-[#E6E6E6] text-green-700 rounded-lg px-4 py-2 mt-5 font-bold">
              Chamar no WhatsApp
            </button>
          </div>

          <img
            src={finance}
            alt=""
            className="w-[500px] h-[300px] absolute bottom-0 -right-48 hidden md:block"
          />
        </div>
      </Layout>
      <Footer show={true} mt={16} smMt={32} />
    </div>
  );
}
