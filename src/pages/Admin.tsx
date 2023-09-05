import { Header } from "../components/Header";
import { Layout } from "../layout/Layout";
import { Footer } from "../sections/Footer";
import formImg from "../assets/iconForm.png";
import * as zod from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

type FormData = zod.infer<typeof schema>;

export function Admin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // navigate
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="admin">
      <Header />
      <Layout className="min-h-screen bg-car object-contain w-screen h-screen">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
          <div className="mx-auto max-w-lg">
            <div className="flex flex-col ">
              <h1 className="text-2xl text-center font-bold text-gray-900">
                Administração
              </h1>
              <img src={formImg} alt="" className="mx-auto mt-4 max-w-xs" />
            </div>

            <form
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="text-white text-[24px] font-bold"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border-green-600 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />

                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-white text-[24px] font-bold"
                >
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full rounded-lg border-green-600 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />

                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>

              <button className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </Layout>
      <Footer show={false} mt={0} smMt={0} />
    </div>
  );
}
