import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Layout } from "../layout/Layout";
import { Footer } from "../sections/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { formatKm } from "../utils/formatPrice";

interface AcessoriesProps {
  value: string;
  label: string;
}

interface CarsProps {
  id: string;
  model: string;
  brand: string;
  price: number;
  km: number;
  doors: number;
  color: string;
  exchange: string;
  direction: string;
  fuel: string;
  location: string;
  description: string;
  yearFactory: number;
  yearModification: number;
  images: string[];
  acessories: AcessoriesProps[];
}

function CardImage({ images, name }: { images: string[]; name: string }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="w-[1190px] h-[600px] mx-auto rounded-lg relative">
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-2 rounded-full"
        onClick={prevSlide}
      >
        <ArrowLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-2 rounded-full"
        onClick={nextSlide}
      >
        <ArrowRight size={24} />
      </button>
      <img
        className="w-full h-full object-cover object-center bg-center rounded-lg"
        src={images[slideIndex]}
        alt={name}
      />
    </div>
  );
}

export function DetailsCar() {
  const [data, setData] = useState<CarsProps[]>([]);
  const location = useLocation();

  const state = location.state as { data: CarsProps };
  const car = state?.data;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CarsProps[];
      setData(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Header />
      <Layout className="min-h-screen">
        <div className="max-w-screen-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1200px] mx-auto overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
              <div className="lg:col-span-3">
                <CardImage images={car.images} name={car.model} />
              </div>

              {/* Coluna para informações do carro */}
              <div className="lg:col-span-2">
                <div className="bg-white p-4 shadow-md rounded-xl">
                  <div className="w-full bg-[#15803D] h-[73px] rounded-xl -mt-4 mb-4" />
                  <h1 className="font-bold text-3xl lg:text-4xl text-[#282828]">
                    {car.brand}{" "}
                    <span className="text-[#15803D]">{car.model}</span>
                  </h1>
                  <p className="text-lg text-[#282828] font-normal mt-2">
                    {car.fuel}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-lg">
                      <p className="text-[#282828] font-semibold">Cidade</p>
                      <p className="text-green-600 font-bold">{car.location}</p>
                    </div>
                    <div className="p-4 rounded-lg">
                      <p className="text-[#282828] font-semibold">
                        Kilometragem
                      </p>
                      <p className="text-green-600 font-bold">{formatKm(car.km)}</p>
                    </div>
                    <div className="p-4 rounded-lg">
                      <p className="text-[#282828] font-semibold">Ano</p>
                      <p className="text-green-600 font-bold">
                        {car.yearFactory}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg">
                      <p className="text-[#282828] font-semibold">Cambio</p>
                      <p className="text-green-600 font-bold">{car.exchange}</p>
                    </div>
                    <div className="p-4 rounded-lg">
                      <p className="text-[#282828] font-semibold">
                        Combustivel
                      </p>
                      <p className="text-green-600 font-bold">{car.fuel}</p>
                    </div>
                    <div className="p-4 rounded-lg">
                      <p className="text-[#282828] font-semibold">Cor</p>
                      <p className="text-green-600 font-bold">{car.color}</p>
                    </div>
                  </div>

                  <div className="bg-green-500 h-[200px] w-full">
                    {car?.acessories?.map((acessorie) => (
                      <p key={acessorie.value}>{acessorie.label}</p>
                    ))}
                  </div>

                  <div className=" mt-5 p-4 rounded-lg">
                    <h2 className="text-xl lg:text-2xl font-bold text-[#282828]">
                      Sobre o carro
                    </h2>
                    <p>{car.description}</p>
                  </div>
                </div>
              </div>

              {/* Coluna para o formulário */}
              <div className="lg:col-span-1">
                <form className="bg-[#1E1E1E] p-4 rounded-[8px]">
                  <h2 className="text-[#15803D] text-2xl font-bold p-4">
                    Entre em contato com o Vendedor!
                  </h2>

                  <p className="text-sm text-white mt-2">Coloque seus dados*</p>

                  <div className="mt-3">
                    <label
                      className="block text-white text-[20px] font-semibold mb-1"
                      htmlFor="name"
                    >
                      Nome
                    </label>
                    <input
                      className="w-full bg-[#333333] py-2 px-4 text-white rounded-lg"
                      type="text"
                      placeholder="Insira seu nome*"
                    />
                  </div>

                  <div className="mt-3">
                    <label
                      className="block text-white text-[20px] font-semibold mb-1"
                      htmlFor="email"
                    >
                      E-mail
                    </label>
                    <input
                      className="w-full bg-[#333333] py-2 px-4 text-white rounded-lg"
                      type="text"
                      placeholder="Insira seu e-mail*"
                    />
                  </div>

                  <div className="mt-3">
                    <label
                      className="block text-white text-[20px] font-semibold mb-1"
                      htmlFor="phone"
                    >
                      Telefone
                    </label>
                    <input
                      className="w-full bg-[#333333] py-2 px-4 text-white rounded-lg"
                      type="text"
                      placeholder="Insira seu telefone*"
                    />
                  </div>

                  <button
                    className="bg-[#15803D] rounded-lg w-full py-2 px-4 mt-5 font-bold text-white hover:bg-green-800 active:bg-green-900"
                    type="submit"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>

            <div className="w-full h-[587px] bg-red-500 mx-auto mt-10">
              {Math.random() * data.length}
            </div>
          </div>
        </div>
      </Layout>
      <Footer show={true} mt={24} smMt={62} />
    </div>
  );
}
