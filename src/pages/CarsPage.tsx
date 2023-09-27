import { collection, onSnapshot } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import { db } from "../firebase";
import { Layout } from "../layout/Layout";
import { Header } from "../components/Header";
import { Footer } from "../sections/Footer";
import { formatPrice } from "../utils/formatPrice";
import { Link } from "react-router-dom";

const brands = [
  { value: "Chevrolet", label: "Chevrolet" },
  { value: "Fiat", label: "Fiat" },
  { value: "Ford", label: "Ford" },
  { value: "Honda", label: "Honda" },
  { value: "Hyundai", label: "Hyundai" },
  { value: "Kia", label: "Kia" },
  { value: "Mercedes-Benz", label: "Mercedes-Benz" },
  { value: "Nissan", label: "Nissan" },
  { value: "Peugeot", label: "Peugeot" },
  { value: "Renault", label: "Renault" },
  { value: "Toyota", label: "Toyota" },
  { value: "Volkswagen", label: "Volkswagen" },
  { value: "Volvo", label: "Volvo" },
];

const yearsFactory = [
  { value: 1995, label: "1995" },
  { value: 1996, label: "1996" },
  { value: 1997, label: "1997" },
  { value: 1998, label: "1998" },
  { value: 1999, label: "1999" },
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
  { value: 2024, label: "2024" },
];

const advertisers = [
  { value: "Particular", label: "Particular" },
  { value: "Concessionária", label: "Concessionária" },
];

const exchange = [
  { value: "manual", label: "Manual" },
  { value: "automatic", label: "Automático" },
  { value: "semi-automatic", label: "Semi-Automático" },
  { value: "cvvt", label: "CVVT" },
];

const direction = [
  { value: "manual", label: "Manual" },
  { value: "eletrica", label: "Elétrica" },
  { value: "hidraulica", label: "Hidráulica" },
];

const fuel = [
  { value: "gasolina", label: "Gasolina" },
  { value: "alcool", label: "Alcool" },
  { value: "diesel", label: "Diesel" },
  { value: "flex", label: "Flex" },
  { value: "gNV", label: "GVN" },
  { value: "hibrido", label: "Hibrido" },
];

const accessories = [
  { value: "ABS", label: "ABS" },
  { value: "Airbag", label: "Airbag" },
  { value: "Alarme", label: "Alarme" },
  { value: "Ar Condicionado", label: "Ar Condicionado" },
  { value: "Catalisador", label: "Catalisador" },
  { value: "Climatizador", label: "Climatizador" },
  { value: "Direção Traseira", label: "Direção Traseira" },
  { value: "Air Bag", label: "Air Bag" },
  { value: "Ar Quente", label: "Ar Quente" },
  { value: "Aros de Liga Leve", label: "Aros de Liga Leve" },
  { value: "Banco de Couro", label: "Banco de Couro" },
  { value: "Blindado", label: "Blindado" },
  { value: "Câmbio Automático", label: "Câmbio Automático" },
  { value: "Cd Player", label: "Cd Player" },
  { value: "Desembaçador Traseiro", label: "Desembaçador Traseiro" },
  { value: "Direção Elétrica", label: "Direção Elétrica" },
  { value: "Direção Hidráulica", label: "Direção Hidráulica" },
  { value: "Freio ABS", label: "Freio ABS" },
  { value: "Limpador Traseiro", label: "Limpador Traseiro" },
  { value: "Painel Digital", label: "Painel Digital" },
  { value: "Retrovisor Elétrico", label: "Retrovisor Elétrico" },
  { value: "Teto Solar", label: "Teto Solar" },
  { value: "Tração 4x4", label: "Tração 4x4" },
  { value: "Trava Elétrica", label: "Trava Elétrica" },
  { value: "Único Dono", label: "Único Dono" },
  { value: "Vidro Elétrico", label: "Vidro Elétrico" },
  { value: "Volante Regulável", label: "Volante Regulável" },
  { value: "Piloto Automático", label: "Piloto Automático" },
  { value: "Camera de Ré", label: "Camera de Ré" },
  { value: "Chave Reserva", label: "Chave Reserva" },
  { value: "GPS", label: "GPS" },
];

const doors = [
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

const body = [
  { value: "seda", label: "Sedan" },
  { value: "hatchback", label: "Hatchback" },
  { value: "utilitario", label: "Utilitário" },
  { value: "suv", label: "SUV" },
  { value: "van", label: "Van" },
];

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
  typeBody: string;
  fuel: string;
  location: string;
  yearFactory: number;
  yearModification: number;
  parcials: string;
  images: string[];
}

export function CarsPage() {
  const [data, setData] = useState<CarsProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYearFactory, setSelectedYearFactory] = useState("");
  const [selectedYearModification, setSelectedYearModification] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredPrice, setFilteredPrice] = useState<number>(0);
  const [selectedExchange, setSelectedExchange] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedDoors, setSelectedDoors] = useState("");
  const [selectedTypeBody, setSelectedTypeBody] = useState("");
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);


  const handleAccessorySelection = (accessory: string) => {
    // Verifique se o acessório já está selecionado
    if (selectedAccessories.includes(accessory)) {
      // Se estiver selecionado, remova-o da lista de seleção
      setSelectedAccessories(selectedAccessories.filter((item) => item !== accessory));
    } else {
      // Caso contrário, adicione-o à lista de seleção
      setSelectedAccessories([...selectedAccessories, accessory]);
    }
  };

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
            className={`${isMenuOpen ? "block" : "hidden"
              } md:block bg-green-700 max-w-[500px] h-[1386px] p-4 transition-transform duration-300 ease-in-out rounded-lg`}
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
                htmlFor="typeFuel"
                className="block mb-2 text-white text-[16px]"
              ></label>
              <select
                id="typeBody"
                value={selectedFuel}
                className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                onChange={(e) => setSelectedFuel(e.target.value)}
              >
                <option value="">Tipo</option>
                {body.map((car) => (
                  <option key={car.value} value={car.value}>
                    {car.label}
                  </option>
                ))}
              </select>
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
                  <option value="">Ano</option>
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
                <option value="">Municipio</option>
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
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="exchange"
                  className="block text-white text-[16px] mb-2"
                ></label>
                <select
                  id="exchange"
                  value={selectedExchange}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                  onChange={(e) => setSelectedExchange(e.target.value)}
                >
                  <option value="">Câmbio</option>
                  {exchange.map((exchange) => (
                    <option key={exchange.value} value={exchange.value}>
                      {exchange.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="direction"
                  className="block text-white text-[16px] mb-2"
                ></label>
                <select
                  id="direction"
                  value={selectedDirection}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                  onChange={(e) => setSelectedDirection(e.target.value)}
                >
                  <option value="">Direção</option>
                  {direction.map((direction) => (
                    <option key={direction.value} value={direction.value}>
                      {direction.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

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

            <div className="mt-4">
              <label
                htmlFor="accessories"
                className="block text-white text-[16px] mb-2"
              >
                Acessórios
              </label>
              <div className="grid grid-cols-2 gap-4 w-full">
                {accessories.map((accessory) => (
                  <div key={accessory.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={accessory.value}
                      name={accessory.value}
                      value={accessory.value}
                      checked={selectedAccessories.includes(accessory.value)}
                      onChange={() => handleAccessorySelection(accessory.value)}
                    />
                    <label className="text-[12px] text-white font-bold">
                      {accessory.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>


            <div className="mt-4">
              <label
                htmlFor="doors"
                className="block text-white text-[20px] mb-2"
              ></label>
              <select
                id="doors"
                value={selectedDoors}
                className="px-[14px] py-[10px] bg-green-200 rounded-md w-full"
                onChange={(e) => setSelectedDoors(e.target.value)}
              >
                <option value="">Portas</option>
                {doors.map((car) => (
                  <option key={car.value} value={car.label}>
                    {car.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-1 gap-2 w-full overflow-auto">
            {data
              .filter(
                (car) =>
                  car.model.toLowerCase().includes(search.toLowerCase()) &&
                  (!selectedBrand || car.brand === selectedBrand) &&
                  (!selectedYearFactory ||
                    String(car.yearFactory) === selectedYearFactory) &&
                  (!selectedYearModification ||
                    String(car.yearModification) ===
                    selectedYearModification) &&
                  (!selectedCity || car.location === selectedCity) &&
                  (filteredPrice === 0 ||
                    (
                      car.price >= filteredPrice)) &&
                  (!selectedExchange || car.exchange === selectedExchange) &&
                  (!selectedDirection || car.direction === selectedDirection) &&
                  (!selectedFuel || car.fuel === selectedFuel) &&
                  (!selectedDoors ||
                    Number(car.doors) === Number(selectedDoors))
              )
              .map((car) => (
                <Link
                  to={`/carros/detalhes/${car.id}`}
                  state={{ data: car }}
                  key={car.id}
                  className="flex flex-col md:flex-row bg-white mb-4"
                >
                  <div className="h-[223px] md:w-[304px] md:rounded-l-lg">
                    <img
                      src={car.images[0]}
                      alt=""
                      className="h-full w-full object-cover md:rounded-l-lg"
                    />
                  </div>

                  <div className="bg-[#F2F2F2] flex flex-col justify-between p-2 w-full rounded-r-lg md:rounded-l-none md:rounded-r-lg md:flex-grow">
                    <div>
                      <h1 className="font-bold text-[20px] md:text-[36px] text-[#15803D]">
                        {car.brand} {car.model}
                      </h1>
                      <p className="text-[12px] md:text-[14px] font-medium">
                        <span className="font-bold">Cidade:</span>{" "}
                        {car.location}
                      </p>
                      <p className="text-[12px] md:text-[14px] font-medium">
                        <span className="font-bold">Ano:</span>{" "}
                        {car.yearFactory}
                      </p>
                      <p className="text-[12px] md:text-[14px] font-medium">
                        <span className="font-bold">KM:</span> {car.km}
                      </p>
                      <p className="text-[12px] md:text-[14px] font-medium">
                        <span className="font-bold">Combustível:</span>{" "}
                        {car.fuel}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-[12px] md:text-[14px] text-[#1E1E1E]">
                        Valor: {formatPrice(car.price)}
                      </p>
                    </div>
                    <div>
                      <button className="py-[8px] px-[8px] md:py-[12px] md:px-[8px] bg-[#15803D] font-bold text-white rounded-lg hover:bg-green-900">
                        {car.parcials}
                      </button>
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
