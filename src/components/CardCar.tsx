/* eslint-disable @typescript-eslint/no-misused-promises */
interface Car {
  id: string;
  name: string;
  price: string;
  color: string;
  images: string[];

  isEditable?: boolean;
  onEdit: (id: string) => void;
  onRemove: (id: string) => Promise<void>;
}

export function CardCar({
  color,
  id,
  name,
  price,
  images,
  onEdit,
  onRemove,
}: Car) {
  return (
    <article
      key={id}
      className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
    >
      <img src={images?.[0]} alt={name} className="h-56 w-full object-cover" />

      <div className="bg-white p-4 sm:p-6">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{color}</p>
        <p className="text-xl font-semibold text-gray-900">{price}</p>
      </div>

      <div className="flex justify-between items-center bg-gray-100 px-4 py-2 sm:px-6">
        <button
          type="button"
          onClick={() => onEdit(id)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => onRemove(id)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Remover
        </button>
      </div>
    </article>
  );
}
