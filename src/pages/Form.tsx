import { Header } from "../components/Header";
import { Layout } from "../layout/Layout";
import { Footer } from "../sections/Footer";

export function Form() {
  return (
    <div>
      <Header />
      <Layout className="min-h-screen">
        <h1 className="text-center mt-5 font-bold">Selecione o formulario para o envio</h1>
        <div className="max-w-4xl h-80 bg-green-500 mx-auto mt-20 flex items-center justify-between p-5">

          <a href="/form/carro" className="bg-white px-24 py-8">Carros</a>
          <a href="/form/moto" className="bg-white px-24 py-8">Motos</a>
        </div>
      </Layout>
      <Footer show={true} />
    </div>
  );
}
