import * as z from "zod";


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

  accessory: z.array(z.string()),
  price: z.number(),
  km: z.number(),

  description: z.string(),

  images: z.array(z.string()),
});

type FormState = z.infer<typeof schema>;

export function FormAdmin() {
  return (
    <div>
      <h1>Form</h1>
    </div>
  );
}
