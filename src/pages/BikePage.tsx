import { collection, onSnapshot } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import { db } from "../firebase";
import { Layout } from "../layout/Layout";
import { Header } from "../components/Header";
import { Footer } from "../sections/Footer";
import { formatPrice } from "../utils/formatPrice";
import { Link } from "react-router-dom";

const brands = [
  { value: "Yamaha", label: "Yamaha" },
  { value: "Honda", label: "Honda" },
  { value: "Kawasaki", label: "Kawasaki" },
  { value: "Suzuki", label: "Suzuki" },
  { value: "Ducati", label: "Ducati" },
  { value: "Harley-Davidson", label: "Harley-Davidson" },
  { value: "BMW Motorrad", label: "BMW Motorrad" },
  { value: "KTM", label: "KTM" },
  { value: "Triumph", label: "Triumph" },
  { value: "Aprilia", label: "Aprilia" },
  { value: "Moto Guzzi", label: "Moto Guzzi" },
  { value: "Royal Enfield", label: "Royal Enfield" },
  { value: "Daelim", label: "Daelim" },
];

const yearsFactory = [
  { value: 2000, label: "2000" },
  { value: 2001, label: "2001" },
  { value: 2002, label: "2002" },
  { value: 2003, label: "2003" },
  { value: 2004, label: "2004" },
  { value: 2005, label: "2005" },
  { value: 2006, label: "2006" },
  { value: 2007, label: "2007" },
  { value: 2008, label: "2008" },
  { value: 2009, label: "2009" },
  { value: 2010, label: "2010" },
  { value: 2011, label: "2011" },
  { value: 2012, label: "2012" },
  { value: 2013, label: "2013" },
  { value: 2014, label: "2014" },
  { value: 2015, label: "2015" },
  { value: 2016, label: "2016" },
  { value: 2017, label: "2017" },
  { value: 2018, label: "2018" },
  { value: 2019, label: "2019" },
  { value: 2020, label: "2020" },
  { value: 2021, label: "2021" },
  { value: 2022, label: "2022" },
  { value: 2023, label: "2023" },
];

const yearsModification = [
  { value: 2000, label: "2000" },
  { value: 2001, label: "2001" },
  { value: 2002, label: "2002" },
  { value: 2003, label: "2003" },
  { value: 2004, label: "2004" },
  { value: 2005, label: "2005" },
  { value: 2006, label: "2006" },
  { value: 2007, label: "2007" },
  { value: 2008, label: "2008" },
  { value: 2009, label: "2009" },
  { value: 2010, label: "2010" },
  { value: 2011, label: "2011" },
  { value: 2012, label: "2012" },
  { value: 2013, label: "2013" },
  { value: 2014, label: "2014" },
  { value: 2015, label: "2015" },
  { value: 2016, label: "2016" },
  { value: 2017, label: "2017" },
  { value: 2018, label: "2018" },
  { value: 2019, label: "2019" },
  { value: 2020, label: "2020" },
  { value: 2021, label: "2021" },
  { value: 2022, label: "2022" },
  { value: 2023, label: "2023" },
];

const kmStart = [
  { value: 0, label: "0" },
  { value: 1, label: "1000" },
  { value: 2, label: "2000" },
  { value: 3, label: "3000" },
  { value: 4, label: "4000" },
  { value: 5, label: "5000" },
  { value: 6, label: "6000" },
  { value: 7, label: "7000" },
  { value: 8, label: "8000" },
  { value: 9, label: "9000" },
  { value: 10, label: "10000" },
  { value: 11, label: "11000" },
  { value: 12, label: "12000" },
  { value: 13, label: "13000" },
];

const kmEnd = [
  { value: 0, label: "0" },
  { value: 1, label: "1000" },
  { value: 2, label: "2000" },
  { value: 3, label: "3000" },
  { value: 4, label: "4000" },
  { value: 5, label: "5000" },
  { value: 6, label: "6000" },
  { value: 7, label: "7000" },
  { value: 8, label: "8000" },
  { value: 9, label: "9000" },
  { value: 10, label: "10000" },
  { value: 11, label: "11000" },
  { value: 12, label: "12000" },
  { value: 13, label: "13000" },
];

const advertisers = [
  { value: "Particular", label: "Particular" },
  { value: "Usado", label: "Usado" },
  { value: "Novo", label: "Novo" },
  { value: "Repasse", label: "Repasse" },
];

const fuel = [
  { value: "Gasolina", label: "Gasolina" },

  { value: "Hibrido", label: "Hibrido" },
];

interface BikeProps {
  id: string;
  model: string;
  brand: string;
  price: number;
  km: number;
  color: string;
  typeBody: string;
  fuel: string;
  location: string;
  yearFactory: number;
  yearModification: number;
  images: string[];
}

export function BikePage() {
  const [data, setData] = useState<BikeProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYearFactory, setSelectedYearFactory] = useState("");
  const [selectedYearModification, setSelectedYearModification] = useState("");
  const [selectedKmStart, setSelectedKmStart] = useState("");
  const [selectedKmEnd, setSelectedKmEnd] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredPrice, setFilteredPrice] = useState<number>(0);

  const [selectedFuel, setSelectedFuel] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bikes"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BikeProps[];
      setData(data);
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
        <div className="max-w-screen-xl mx-auto mt-5 p-4 flex flex-col md:flex-row md:items-start md:space-x-4">
          <div className="md:hidden">
            <button
              className="bg-green-700 hover:bg-green-900 text-white p-2 rounded-md mb-4"
              onClick={toggleMenu}
            >
              {isMenuOpen ? "Fechar filtros" : "Abrir filtros"}
            </button>
          </div>
          {/* Menu lateral em desktop */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:block bg-green-700 max-w-[500px] h-[686px] p-4 transition-transform duration-300 ease-in-out rounded-lg`}
          >
            <h1 className="text-white text-[32px] font-bold mb-4">Filtros</h1>
            <div>
              <label
                htmlFor="modelSelect"
                className="block mb-2 text-white text-[16px]"
              >
                Busca
              </label>
              <input
                className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                id="modelSelect"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="brand"
                className="text-white text-[16px] mb-2"
              ></label>
              <select
                id="brand"
                value={selectedBrand}
                className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Marca</option>
                {brands.map((brand) => (
                  <option key={brand.value} value={brand.value}>
                    {brand.label}
                  </option>
                ))}
              </select>
            </div>

            <div className=" grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
              <div className="cols-span-2">
                <label
                  htmlFor="yearFactory"
                  className="block text-white text-[16px] mb-2"
                ></label>
                <select
                  id="yearFactory"
                  value={selectedYearFactory}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md cols-span-2 w-full"
                  onChange={(e) => setSelectedYearFactory(e.target.value)}
                >
                  <option value="">Ano inicial</option>
                  {yearsFactory.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                <label className="text-white">Zero KM</label>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="city"
                className="block text-white text-[16px] mb-2"
              ></label>
              <select
                id="city"
                value={selectedCity}
                className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Cidade</option>
                {data.map((car) => (
                  <option key={car.id} value={car.location}>
                    {car.location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                value={filteredPrice}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFilteredPrice(Number(e.target.value))
                }
                min={0}
                max={200000}
                type="range"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-10"
              />
              <strong className="text-white text-[16px]">
                {formatPrice(filteredPrice)}
              </strong>
            </div>

            <div>
              <div className="mt-4">
                <label
                  htmlFor="advertisers"
                  className="text-white text-[16px] mb-2"
                ></label>
                <select
                  id="advertisers"
                  value={selectedBrand}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">Tipo de anuncio</option>
                  {advertisers.map((ad) => (
                    <option key={ad.value} value={ad.value}>
                      {ad.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4"></div>

            <div>
              <div className="mt-4">
                <label
                  htmlFor="fuel"
                  className="text-white text-[16px] mb-2"
                ></label>
                <select
                  id="fuel"
                  value={selectedBrand}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">Combustível</option>
                  {fuel.map((fuel) => (
                    <option key={fuel.value} value={fuel.value}>
                      {fuel.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-1 gap-2 w-full overflow-auto">
            {data
              .filter(
                (bike) =>
                  bike.model.toLowerCase().includes(search.toLowerCase()) &&
                  (!selectedBrand || bike.brand === selectedBrand) &&
                  (!selectedYearFactory ||
                    String(bike.yearFactory) === selectedYearFactory) &&
                  (!selectedYearModification ||
                    String(bike.yearModification) ===
                      selectedYearModification) &&
                  (!selectedCity || bike.location === selectedCity) &&
                  (filteredPrice === 0 ||
                    (bike.price >= filteredPrice &&
                      (!selectedFuel || bike.fuel === selectedFuel))),
              )

              .map((bike) => (
                <Link
                  to={`/motos/detalhes/${bike.id}`}
                  state={{ data: bike }}
                  key={bike.id}
                  className="flex flex-col md:flex-row bg-white mb-4"
                >
                  <div className="h-[223px] md:w-[304px] md:rounded-l-lg">
                    <img
                      src={bike.images[0]}
                      alt=""
                      className="h-full w-full object-cover md:rounded-l-lg"
                    />
                  </div>

                  <div className="bg-[#F2F2F2] flex flex-col justify-between p-2 w-full rounded-r-lg md:rounded-l-none md:rounded-r-lg md:flex-grow">
                    <div>
                      <h1 className="font-bold text-[20px] md:text-[36px] text-[#15803D]">
                        {bike.brand} {bike.model}
                      </h1>
                      <p className="text-[12px] md:text-[14px] font-medium">
                        <span className="font-bold">Cidade:</span>{" "}
                        {bike.location}
                      </p>
                      <p className="text-[12px] md:text-[14px] font-medium">
                        <span className="font-bold">Ano:</span>{" "}
                        {bike.yearFactory}
                      </p>
                      <p className="text-[12px] md:text-[14px] font-medium">
                        <span className="font-bold">KM:</span> {bike.km}
                      </p>
                      <p className="text-[12px] md:text-[14px] font-medium">
                        <span className="font-bold">Combustível:</span>{" "}
                        {bike.fuel}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-[12px] md:text-[14px] text-[#1E1E1E]">
                        Valor: {formatPrice(bike.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </Layout>
      <Footer show={true} mt={6} smMt={32} />
    </div>
  );
}
