import { PhotoIcon } from "@heroicons/react/20/solid";
import { Layout } from "../layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react";

interface CreateCarProps {
  name: string;
  location: string;
  brand: string;
  model: string;
  typeBody: string;
  mechanic: string;
  plate: string;
  auction: string;
  yearFactory: number;
  yearModification: number;
  color: string;
  doors: number;
  accessory: string[];
  price: number;
  exchange: string;
  km: number;
  fuel: string;
  description: string;
  parcials: string;
  images: string[];
}

const schema = z.object({
  name: z.string(),
  location: z.string(),
  brand: z.string(),
  model: z.string(),
  typeBody: z.string(),
  mechanic: z.string(),
  plate: z.string(),
  auction: z.string(),
  yearFactory: z.number(),
  yearModification: z.number(),
  color: z.string(),
  doors: z.number(),
  exchange: z.string(),
  accessory: z.array(z.string()),
  price: z.number(),
  fuel: z.string(),
  km: z.number(),
  description: z.string(),
  parcials: z.string(),
  images: z.array(z.string()),
});

type FormState = z.infer<typeof schema>;

const accessories = [
  { value: "ABS", label: "ABS" },
  { value: "Airbag", label: "Airbag" },
  { value: "Alarme", label: "Alarme" },
  { value: "Ar Condicionado", label: "Ar Condicionado" },
  { value: "Catalisador", label: "Catalisador" },
  { value: "Climatizador", label: "Climatizador" },
  { value: "Direção Traseira", label: "Direção Traseira" },
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

export function CreateCar() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const { handleSubmit, register, reset } = useForm<FormState>();

  const downloadURLs: string[] = [];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles) {
      for (const element of Array.from(selectedFiles)) {
        const file = element;
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        downloadURLs.push(downloadURL);
        console.log("Image uploaded successfully:", downloadURL);
      }
    }
    return downloadURLs;
  };

  const handleFormSubmit: SubmitHandler<CreateCarProps> = async (data) => {
    console.log(data);

    setLoading(true);
    try {
      console.log("Loading");
      if (selectedFiles) {
        const downloadURLs = await handleUpload();
        data.images = downloadURLs;
      }

      await addDoc(collection(db, "cars"), data);
      console.log("Document successfully written!");
      reset();
    } catch (error) {
      console.error("Error adding car data to Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Layout className="min-h-screen p-2">
        <Link
          to="/dashboard"
          className="block w-[70px]  bg-green-700 hover:bg-green-900 text-white p-2 rounded-md mb-4"
        >
          <ArrowLeft className="h-12 w-12 text-green-500" />
        </Link>

        <form
          className="max-w-lg mx-auto mt-5 mb-24 "
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Envie as informações do seu carro para o anuncio!
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Informe os dados do carro!*
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Nome */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nome
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                    placeholder="Ex: pedro"
                  />
                </div>
              </div>

              {/* Parcelas */}
              <div>
                <label
                  htmlFor="parcials"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Parcelas
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="parcials"
                    {...register("parcials")}
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                    placeholder="Ex: 12x 80.000"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              {/* Municipio */}
              <label
                htmlFor="localizacao"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Municipio
              </label>
              <div className="mt-1">
                <select
                  className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                  {...register("location")}
                >
                  <option value="">Selecione um estado</option>
                  <option value="">Selecione um município</option>
                  <option value="SaoPaulo">São Paulo</option>
                  <option value="Guarulhos">Guarulhos</option>
                  <option value="Campinas">Campinas</option>
                  <option value="SaoBernardo">São Bernardo do Campo</option>
                  <option value="SantoAndre">Santo André</option>
                  <option value="Osasco">Osasco</option>
                </select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Marca */}
              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Marca
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="brand"
                    {...register("brand")}
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                    placeholder="Ex: Volkswagen"
                  />
                </div>
              </div>

              {/* Modelo */}
              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Modelo
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="model"
                    {...register("model")}
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                    placeholder="Ex: Gol"
                  />
                </div>
              </div>
            </div>

            {/* Outros campos de entrada aqui */}

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              {/* Tipo de Carroceria */}
              <div>
                <label
                  htmlFor="bodyType"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tipo de carroceria
                </label>
                <div className="mt-1">
                  <select
                    id="bodyType"
                    {...register("typeBody")}
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                  >
                    <option>Selecione o tipo da carroceria</option>
                    <option>SUV</option>
                    <option>Sedan</option>
                    <option>Hatch</option>
                    <option>Utilitário</option>
                    <option>Van</option>
                  </select>
                </div>
              </div>

              {/* KM */}
              <div>
                <label
                  htmlFor="km"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  KM
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="km"
                    {...register("km")}
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                    placeholder="Ex: 18.000"
                  />
                </div>
              </div>
            </div>

            {/* Outros campos de entrada aqui */}

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Mecanico */}
              <div>
                <label
                  htmlFor="mechanic"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mecanico
                </label>
                <div className="mt-1">
                  <select
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                    id="mechanic"
                    {...register("mechanic")}
                  >
                    <option>Ótimo</option>
                    <option>Bom</option>
                    <option>Ruim</option>
                  </select>
                </div>
              </div>

              {/* Leilão */}
              <div>
                <label
                  htmlFor="auction"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Leilão
                </label>
                <div className="mt-1">
                  <select
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                    {...register("auction")}
                  >
                    <option>Sim</option>
                    <option>Não</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Outros campos de entrada aqui */}

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Ano de fabricação */}
              <div>
                <label
                  htmlFor="yearFactory"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ano de fabricação
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="yearFactory"
                    {...register("yearFactory")}
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                    placeholder="Ex: 2022"
                  />
                </div>
              </div>

              {/* Ano de modificação */}
              <div>
                <label
                  htmlFor="yearModification"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ano de modificação <span className="text-xs">(opcional)</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="yearModification"
                    {...register("yearModification")}
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                    placeholder="Ex: 2025"
                  />
                </div>
              </div>
            </div>

            {/* Outros campos de entrada aqui */}

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Cor */}
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cor
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="color"
                    {...register("color")}
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                    placeholder="Ex: Azul"
                  />
                </div>
              </div>

              {/* Portas */}
              <div>
                <label
                  htmlFor="doors"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Portas
                </label>
                <div className="mt-1">
                  <select
                    className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                    {...register("doors")}
                  >
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Outros campos de entrada aqui */}

            {/* Selecione o cambio */}
            <div className="col-span-full mt-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Selecione o cambio
              </label>
              <div className="mt-1">
                <select
                  className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                  {...register("exchange", { required: true })}
                >
                  <option>Selecione o tipo de cambio</option>
                  <option value="Manual">Manual</option>
                  <option value="Eletrica">Eletrica</option>
                  <option value="Hidraulica">Hidraulica</option>
                </select>
              </div>
            </div>

            {/* Outros campos de entrada aqui */}

            {/* Acessórios do Carro */}
            <div className="col-span-full mt-6 w-full">
              <label
                htmlFor="accessories"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Acessórios do Carro
              </label>
              <div className="mt-2 w-full">
                <div className="w-full space-y-2 grid grid-cols-2">
                  {accessories.map((accessory) => (
                    <label key={accessory.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={accessory.value}
                        value={accessory.value}
                        {...register("accessory")}
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2 text-gray-900">
                        {accessory.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Preço do Carro */}
            <div className="col-span-full mt-6 w-full">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Preço do Carro
              </label>
              <div className="mt-2 w-full">
                <input
                  type="text"
                  id="price"
                  {...register("price")}
                  className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                  placeholder="Ex: R$ 100.000"
                />
              </div>
            </div>

            {/* Combustível */}
            <div className="col-span-full mt-6 w-full">
              <label
                htmlFor="fuel"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Combustível
              </label>
              <div className="mt-2 w-full">
                <select
                  id="fuel"
                  {...register("fuel")}
                  className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                >
                  <option value="">Selecione um tipo de combustível</option>
                  <option value="Flex">Flex</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Etanol">Etanol</option>
                  <option value="GNV">GNV</option>
                  <option value="Elétrico">Elétrico</option>
                </select>
              </div>
            </div>

            {/* Descrição */}
            <div className="col-span-full mt-6 w-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Descrição
              </label>
              <div className="mt-2 w-full">
                <textarea
                  id="description"
                  className="block w-full py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-green-200"
                  placeholder="Ex: Carro muito bom!"
                  rows={4}
                  cols={50}
                  {...register("description")}
                />
              </div>
            </div>
          </div>

          {/* Upload de Fotos */}
          <div className="col-span-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      {...register("images")}
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Botão de Envio */}
          <div className="col-span-full mt-6">
            <button
              type="submit"
              className="mt-10 w-full rounded bg-green-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
            >
              Adicionar
            </button>
          </div>
        </form>
      </Layout>
    </div>
  );
}
