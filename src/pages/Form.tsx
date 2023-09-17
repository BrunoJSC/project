import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { db, storage } from "../firebase";
import { Layout } from "../layout/Layout";
import { Image } from "lucide-react";

interface CreateCarPageProps {
  name: string;
  email: string;
  model: string;
  fip: number;
  phone: number;
  location: string;
  plate: string;
  brand: string;
  typeBody: string;
  mechanic: string;
  auction: string;
  yearFactory: number;
  yearModification: number;
  color: string;
  km: number;
  doors: number;
  accessory: string[];
  price: number;
  typeFuel: string;
  exchange: string;
  description: string;
  parcials: string;
  images: string[];
}

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  model: z.string(),
  fip: z.number(),
  phone: z.number(),
  location: z.string(),
  plate: z.string(),
  brand: z.string(),
  typeBody: z.string(),
  mechanic: z.string(),
  auction: z.string(),
  yearFactory: z.number(),
  yearModification: z.number(),
  color: z.string(),
  typeFuel: z.string(),
  doors: z.number(),
  accessory: z.array(z.string()),
  price: z.number(),
  km: z.number(),
  exchange: z.string(),
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

export function Form() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormState>({});

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

  const handleFormSubmit: SubmitHandler<CreateCarPageProps> = async (data) => {
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
    <>
      <Layout>
        <form
          className="max-w-xl mx-auto mt-5 mb-24 p-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="space-y-6 sm:space-y-8">
            <div className="border-b border-gray-900/10 pb-6 sm:pb-10">
              <h2 className="text-[32px] font-bold text-[#1E1E1E] leading-10">
                Envie as informações do seu{" "}
                <span className="text-green-500">carro</span>/
                <span className="text-green-500">moto</span> para o anúncio!
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Informe os dados do carro!*
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Nome
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full bg-[#15803D29] rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("name", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6  bg-[#15803D29]"
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              <div className="col-span-6">
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Parcelas
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full bg-['rgba(21, 128, 61, 0.16)] rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("parcials", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              <div className="col-span-6">
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  FIP
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full bg-['rgba(21, 128, 61, 0.16)] rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("fip", { required: true })}
                  />
                </div>
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Telefone
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("phone", { required: true })}
                  />
                </div>
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Localização
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("location", { required: true })}
                  >
                    <option value="">Selecione um estado</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="Tocantins - TO">Tocantins</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-span-6">
              <label className="block text-sm font-bold leading-6 text-gray-900">
                Selecione o cambio
              </label>
              <div className="mt-2">
                <select
                  className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                  {...register("exchange", { required: true })}
                >

                  <option>Selecione o tipo de cambio</option>
                  <option value="Manual">Manual</option>
                  <option value="eletrica">Eletrica</option>
                  <option value="hidraulica">Hidraulica</option>
                </select>
              </div>
            </div>


            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Marca
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full py-1.5 bg-form rounded-[8px] px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("brand", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Modelo
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full py-1.5 bg-form rounded-[8px] px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("model", { required: true })}
                  />
                </div>
              </div>
            </div>

            {/* Continue adicionando campos de acordo com a estrutura atual */}
            <div className="col-span-6">
              <label className="block text-sm font-bold leading-6 text-gray-900">
                Tipo de Carroceria
              </label>
              <div className="mt-2">
                <select
                  className="block w-full py-1.5 bg-form rounded-[8px] px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                  {...register("typeBody", { required: true })}
                >
                  <option>Selecione carroceria</option>
                  <option value="suv">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="hatch">Hatch</option>
                  <option value="utilitarios">Utilitário</option>
                  <option value="van">Van</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Mecanica
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("mechanic", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Placa
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("plate", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-6">
              <label className="block text-sm font-bold leading-6 text-gray-900">
                Leilão
              </label>
              <div className="mt-2">
                <select
                  className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                  {...register("auction", { required: true })}
                >
                  <option>Selecione sim ou  não</option>
                  <option value="sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>
            </div>

            <div className="col-span-6">
              <label className="block text-sm font-bold leading-6 text-gray-900">
                Tipo de gasolina
              </label>
              <div className="mt-2">
                <select
                  className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                  {...register("typeFuel", { required: true })}
                >
                  <option value="">Selecione um tipo de combustível</option>
                  <option value="flex">Flex</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Etanol">Etanol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="GNV">GNV</option>

                  <option value="eletrico">Eletrico</option>
                </select>
              </div>
            </div>

            <div className="col-span-6">
              <label className="block text-sm  font-bold leading-6 text-gray-900">
                KM
              </label>
              <div className="mt-2">
                <input
                  placeholder="Ex 18.000"
                  className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                  {...register("km", { required: true })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Ano de Fabricação
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Ex: 2020"
                    className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("yearFactory", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Ano de Modificação (Opcional)
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Ex: 2024"
                    className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("yearModification", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Cor
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Ex: Azul"
                    className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("color", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold leading-6 text-gray-900">
                  Portas
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                    {...register("doors", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6 mt-6 w-full">
              <label
                htmlFor="accessories"
                className="block text-sm font-bold leading-6 text-gray-900 "
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

            <div className="col-span-6">
              <label className="block text-sm  font-bold leading-6 text-gray-900">
                Preço do Carro{" "}
              </label>
              <div className="mt-2">
                <input
                  className="block w-full bg-form rounded-[8px] py-1.5 px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                  {...register("price", { required: true })}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-bold leading-6 text-gray-900">
              Descrição
            </label>
            <div className="mt-2">
              <textarea
                className="block w-full py-1.5 bg-form rounded-[8px] px-2 text-black placeholder-text-white focus:ring-0 sm:text-sm sm:leading-6 bg-[#15803D29]"
                rows={6}
                {...register("description", { required: true })}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-bold leading-6 text-gray-900">
              Fotos precisaram pegar o ângulo do carro inteiro*
            </label>
            <div className="mt-2 flex justify-center bg-form rounded-[8px]  border border-dashed border-gray-900/25 px-6 py-10 bg-[#15803D29]">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-green-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-900 focus-within:ring-offset-2 hover:text-green-500"
              >
                <Image className="h-12 w-12 text-green-500 bg-[#15803D29]" />
                <input
                  id="file-upload"
                  {...register("images")}
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  type="file"
                  className="sr-only "
                />
              </label>
            </div>
            <ul className="mt-5">
              <p>*Observações:</p>
              <li>Frente, Traseira, Lateral Esquerda, Lateral Direita*</li>
              <li>Fotos precisaram pegar o ângulo do carro inteiro*</li>
            </ul>
          </div>

          <div className="mt-4 text-green-700">
            <p className=" text-semibold text-[18px]">
              *Revise todas as informações antes de enviar!
            </p>
          </div>
          <button
            type="submit"
            className={`mt-6 w-full rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-500 ${loading && "cursor-not-allowed"
              }`}
            disabled={loading}
          >
            Enviar
          </button>
        </form>
      </Layout >
    </>
  );
}
