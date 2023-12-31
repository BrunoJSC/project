import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { db, storage } from "../firebase";
import { Layout } from "../layout/Layout";
import { ArrowLeft, Image } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

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

  accessory: string[];
  price: number;
  typeFuel: string;

  description: string;
  images: string[];
}

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
  price: z.number(),
  km: z.number(),
  description: z.string(),
  images: z.array(z.string()),
});

type FormState = z.infer<typeof schema>;

export function FormBike() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormState>({});

  const handleFormSubmit: SubmitHandler<CreateCarPageProps> = async (data) => {
    setLoading(true);
    try {
      const templateParams = {
        to_name: data.name,
        message: `
        <html>
          <body>
            <p>Informações da moto:</p>
            <ul>
              <li>Nome: ${data.name}</li>
              <li>Email: ${data.email}</li>
              <li>Modelo: ${data.model}</li>
              <!-- Outros campos do formulário aqui -->
            </ul>
            <p>Imagem do carro:</p>
            <img src='${data.images[0]}' alt="Imagem do Carro">
          </body>
        </html>
      `,
      };

      await emailjs.send(
        "service_x5am4vw",
        "template_vnqp85r",
        templateParams,
        "LKMoT2R2yHx_zOxUI",
      );

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
      <Layout className="p-2">
        <Link
          to="/dashboard"
          className="block w-[70px]  bg-green-700 hover:bg-green-900 text-white p-2 rounded-md mb-4"
        >
          <ArrowLeft className="h-12 w-12 text-green-500" />
        </Link>
        <form
          action="https://formsubmit.co/db@autonegocie.com.br"
          method="POST"
          className="max-w-xl mx-auto mt-5 mb-24 p-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="space-y-6 sm:space-y-8">
            <div className="border-b border-gray-900/10 pb-6 sm:pb-10">
              <h2 className="text-[32px] font-bold text-[#1E1E1E] leading-10">
                Envie as informações da sua{" "}
                <span className="text-green-500">moto</span> para o anúncio!
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Informe os dados da moto!*
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
                    <option value="">Selecione um município</option>
                    <option value="Adamantina">Adamantina</option>
                    <option value="Aguaí">Aguaí</option>
                    <option value="Águas da Prata">Águas da Prata</option>
                    <option value="Águas de Lindoia">Águas de Lindoia</option>
                    <option value="Águas de Santa Bárbara">
                      Águas de Santa Bárbara
                    </option>
                    <option value="Águas de São Pedro">
                      Águas de São Pedro
                    </option>
                    <option value="Agudos">Agudos</option>
                    <option value="Alambari">Alambari</option>
                    <option value="Alfredo Marcondes">Alfredo Marcondes</option>
                    <option value="Altair">Altair</option>
                    <option value="Altinópolis">Altinópolis</option>
                    <option value="Alto Alegre">Alto Alegre</option>
                    <option value="Alumínio">Alumínio</option>
                    <option value="Álvares Florence">Álvares Florence</option>
                    <option value="Álvares Machado">Álvares Machado</option>
                    <option value="Álvaro de Carvalho">
                      Álvaro de Carvalho
                    </option>
                    <option value="Alvinlândia">Alvinlândia</option>
                    <option value="Americana">Americana</option>

                    <option value="Votuporanga">Votuporanga</option>
                    <option value="Votorantim">Votorantim</option>
                    <option value="Votuporanga">Votuporanga</option>
                  </select>
                </div>
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
                  <option>Selecione sim ou não</option>
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 sm:gap-8">
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
            </div>

            <div className="col-span-6">
              <label className="block text-sm  font-bold leading-6 text-gray-900">
                Preço da Moto{" "}
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
            className={`mt-6 w-full rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-500 ${
              loading && "cursor-not-allowed"
            }`}
            disabled={loading}
          >
            Enviar
          </button>
        </form>
      </Layout>
    </>
  );
}
