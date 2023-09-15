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

const exchange = [
  { value: "manual", label: "Manual" },
  { value: "automatic", label: "Automático" },
  { value: "semi-automatic", label: "Semi-Automático" },
  { value: "cvvt", label: "CVVT" },
];

const direction = [
  { value: "Manual", label: "manual" },
  { value: "Eletrica", label: "eletrica" },
  { value: "Hidraulica", label: "hidraulica" },
];

const fuel = [
  { value: "Gasolina", label: "Gasolina" },
  { value: "Alcool", label: "Alcool" },
  { value: "Diesel", label: "Diesel" },
  { value: "Flex", label: "Flex" },
  { value: "GNV", label: "GVN" },
  { value: "Hibrido", label: "Hibrido" },
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
  { value: "utilitario", label: "Utilitario" },
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
  images: string[];
}

export function CarsPage() {
  const [data, setData] = useState<CarsProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYearFactory, setSelectedYearFactory] = useState("");
  const [selectedYearModification, setSelectedYearModification] = useState("");
  const [selectedKmStart, setSelectedKmStart] = useState("");
  const [selectedKmEnd, setSelectedKmEnd] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredPrice, setFilteredPrice] = useState<number>(0);
  const [selectedExchange, setSelectedExchange] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedAccessories, setSelectedAccessories] = useState<string>("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedDoors, setSelectedDoors] = useState("");
  const [selectedTypeBody, setSelectedTypeBody] = useState("");

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
              {isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
            </button>
          </div>
          {/* Menu lateral em desktop */}
          <div
            className={`${isMenuOpen ? "block" : "hidden"
              } md:block bg-green-700 w-[500px] h-[1986px] p-4 transition-transform duration-300 ease-in-out`}
          >
            <h1 className="text-white text-[32px] font-bold mb-4">Filtros</h1>
            <div>
              <label
                htmlFor="modelSelect"
                className="block mb-2 text-white text-[16px]"
              >
                Modelo de Carro
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
                className="block mb-2 text-white  text-[16px]"
              >
                Carroceria
              </label>
              <select
                id="typeBody"
                value={selectedFuel}
                className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                onChange={(e) => setSelectedFuel(e.target.value)}
              >
                <option value="">Selecione um tipo de combustível</option>
                {body.map((car) => (
                  <option key={car.value} value={car.value}>
                    {car.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="brand" className="text-white  text-[16px] mb-2">
                Marca
              </label>
              <select
                id="brand"
                value={selectedBrand}
                className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Selecione uma marca</option>
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
                >
                  Ano inicial
                </label>
                <select
                  id="yearFactory"
                  value={selectedYearFactory}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md cols-span-2 w-full"
                  onChange={(e) => setSelectedYearFactory(e.target.value)}
                >
                  <option value="">Selecione um ano de fabricação</option>
                  {yearsFactory.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="yearModification"
                  className="block text-white  text-[16px] mb-2"
                >
                  Ano de final
                </label>
                <select
                  id="yearModification"
                  value={selectedYearModification}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                  onChange={(e) => setSelectedYearModification(e.target.value)}
                >
                  <option value="">Selecione um ano de modificação</option>
                  {yearsModification.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="km"
                  className="block text-white text-[16px] mb-2"
                >
                  KM Inicial
                </label>
                <select
                  id="km"
                  value={selectedKmStart}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                  onChange={(e) => setSelectedKmStart(e.target.value)}
                >
                  <option value="">Selecione um KM inicial</option>
                  {kmStart.map((km) => (
                    <option key={km.value} value={km.value}>
                      {km.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="km"
                  className="block text-white text-[16px] mb-2"
                >
                  KM Final
                </label>
                <select
                  id="km"
                  value={selectedKmEnd}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                  onChange={(e) => setSelectedKmEnd(e.target.value)}
                >
                  <option value="">Selecione um KM final</option>
                  {kmEnd.map((km) => (
                    <option key={km.value} value={km.value}>
                      {km.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="city"
                className="block text-white text-[16px] mb-2"
              >
                Cidade
              </label>
              <select
                id="city"
                value={selectedCity}
                className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Selecione uma cidade</option>
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
                  className="text-white  text-[16px] mb-2"
                >
                  Anunciantes
                </label>
                <select
                  id="advertisers"
                  value={selectedBrand}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">Selecione um anunciante</option>
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
                >
                  Cambio
                </label>
                <select
                  id="exchange"
                  value={selectedExchange}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                  onChange={(e) => setSelectedExchange(e.target.value)}
                >
                  <option value="">Selecione um KM inicial</option>
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
                >
                  Direção
                </label>
                <select
                  id="direction"
                  value={selectedDirection}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                  onChange={(e) => setSelectedDirection(e.target.value)}
                >
                  <option value="">Selecione um KM final</option>
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
                <label htmlFor="fuel" className="text-white  text-[16px] mb-2">
                  Tipo de Combustivel
                </label>
                <select
                  id="fuel"
                  value={selectedBrand}
                  className="px-[14px] py-[7px] bg-green-200 rounded-md w-full"
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">Selecione um tipo de combustível</option>
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
                acessorios
              </label>
              <div className="grid grid-cols-2 gap-4 w-full">
                {accessories.map((accessory) => (
                  <div
                    key={accessory.value}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id={accessory.value}
                      name={accessory.value}
                      value={accessory.value}
                      onChange={(e) => setSelectedAccessories(e.target.value)}
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
              >
                Portas
              </label>
              <select
                id="doors"
                value={selectedDoors}
                className="px-[14px] py-[10px] bg-green-200 rounded-md w-full"
                onChange={(e) => setSelectedDoors(e.target.value)}
              >
                <option value="">Selecione uma porta</option>
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
                  (!selectedKmStart || car.km >= parseFloat(selectedKmStart)) &&
                  (!selectedKmEnd || car.km <= parseFloat(selectedKmEnd)) &&
                  (!selectedCity || car.location === selectedCity) &&
                  (filteredPrice === 0 ||
                    (car.price <= filteredPrice &&
                      car.price >= filteredPrice)) &&
                  (!selectedExchange || car.exchange === selectedExchange) &&
                  (!selectedDirection || car.direction === selectedDirection) &&
                  (!selectedFuel || car.fuel === selectedFuel) &&
                  (!selectedDoors ||
                    Number(car.doors) === Number(selectedDoors)),
              )
              .map((car) => (
                <Link
                  to={`/carros/detalhes/${car.id}`}
                  state={{ data: car }}
                  key={car.id}
                  className=" bg-white flex"
                >
                  <div className="h-[223px] md:w-[304px] rounded-l-lg">
                    <img
                      src={car.images[0]}
                      alt=""
                      className="h-full w-full object-cover rounded-l-lg"
                    />
                  </div>

                  <div className="bg-[#F2F2F2] flex flex-col justify-between p-2 w-full rounded-r-lg">
                    <div>
                      <h1 className="font-bold text-[36px] text-[#15803D]">
                        {car.brand} {car.model}
                      </h1>
                      <p className="text-[14px] font-medium">{car.location}</p>
                      <p className="text-[14px] font-medium">
                        Ano: {car.yearFactory}
                      </p>
                      <p className="text-[14px] font-medium">KM: {car.km}</p>
                      <p className="text-[14px] font-medium">
                        Tipo de Combustível: {car.fuel}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-[14px] text-[#1E1E1E]">
                        Valor: {car.price}
                      </p>
                    </div>

                    <div>
                      <button className="py-[12px] px-[8px] bg-[#15803D] font-bold text-white rounded-lg hover:bg-green-900">
                        48x de R$ 137.136,000 á parcela
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
