import { Banner } from "../components/Banner";
import { Header } from "../components/Header";
import { Layout } from "../layout/Layout";
import { FAQ } from "../sections/FAQ";
import { Feature } from "../sections/Feature";
import { Footer } from "../sections/Footer";

export function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Layout className="min-h-screen">
        <Banner
          img="bg-banner"
          title="Encontramos o seu carro ideal!"
          text="Venha ser mais um cliente e faça parte da nossa história"
          show={true}
        />
        <Feature />
        <FAQ />
      </Layout>
      <Footer show={true} mt={16} smMt={32} />
    </div>
  );
}
