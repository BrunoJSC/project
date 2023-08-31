interface CardProps {
  img: string;
  title: string;
  text: string;
}

export function Card({ img, title, text }: CardProps) {
  return (
    <div className="w-full sm:w-[396px] md:w-[320px] lg:w-[396px] h-[156px] mx-auto flex flex-col sm:flex-row">
      <img
        src={img}
        alt=""
        className="bg-green-700 p-2 rounded-[8px] w-[62px] h-[62px] mx-auto sm:mx-0"
      />

      <div className="mt-4 sm:mt-0 ml-0 sm:ml-4">
        <h2 className="text-[#1E1E1E] text-base sm:text-xl font-bold">
          {title}
        </h2>
        <p className="text-[#848484] text-sm sm:text-base font-normal mt-2 sm:mt-3 w-full sm:w-[240px] lg:w-[322px]">
          {text}
        </p>
      </div>
    </div>
  );
}
