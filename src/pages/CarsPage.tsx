import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Layout } from "../layout/Layout";
import { Header } from "../components/Header";
import { Footer } from "../sections/Footer";

interface CarsProps {
  id: string;
  model: string;
  brand: string;
  price: number;
  km: number;
  fuel: string;
  images: string[];
}

interface MenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const CarMenu: React.FC<MenuProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div
      onClick={toggleMenu}
      className={`${
        isMenuOpen ? "block" : "hidden md:block"
      } bg-green-700 rounded-md p-4 transition-transform duration-300 transform origin-top w-[580px] h-[650px]`}
    >
      <p className="text-white">Menu</p>
    </div>
  );
};

export function CarsPage() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CarsProps[];
      setCars(data);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Header />
      <Layout className="min-h-screen">
        <div className="max-w-screen-xl mx-auto mt-5 p-4 grid grid-cols-1 md:grid-cols-2 place-content-between bg-blue-500">
          <button
            className="block md:hidden bg-green-700 hover:bg-green-900 text-white p-2 rounded-md mb-4"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
          </button>

          <CarMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

          <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-1 gap-4 bg-red-500 w-full">
            {cars.map((car: CarsProps) => (
              <div key={car.id} className="border bg-white rounded-md flex">
                <div className="w-full h-full object-contain">
                  <img src={car.images[0]} alt="" className="w-36 rounded-lg" />
                </div>
                <div>
                  <h1 className="font-bold text-[36px] text-[#15803D]">
                    {car.model}
                  </h1>
                  <p>{car.fuel}</p>
                  <p>{car.km}</p>
                  {car.price}
                  <p>{car.brand}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
      <Footer show={true} mt={6} smMt={32} />
    </div>
  );
}
