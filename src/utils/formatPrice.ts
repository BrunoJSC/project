export function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export const format = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
