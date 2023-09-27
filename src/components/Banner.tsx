interface FooterProps {
  img: string;
  title: string;
  subtitle?: string;
  text: string;
  show?: boolean;
}

export function Banner({ img, title, subtitle, text, show }: FooterProps) {
  return (
    <section className={`${img} bg-no-repeat bg-cover bg-center`}>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-white text-3xl font-extrabold sm:text-4xl">
            {title}
            {subtitle}
          </h1>

          <p className="text-white mt-4 sm:text-xl/relaxed">{text}</p>

          <div
            className={`${show ? "block" : "hidden"
              } mt-8 flex flex-wrap justify-center gap-4`}
          >
            <a
              className="block w-full rounded bg-green-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
              href="carros"
            >
              Catálogo
            </a>

            <a
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-green-600 shadow hover:bg-white/90 focus:outline-none focus:ring active:bg-white/90 sm:w-auto"
              href="anunciar"
            >
              Anuncie já
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
