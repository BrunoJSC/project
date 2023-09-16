export function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export const format = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export function formatKm(km: number): string {
  if (km >= 1000) {
    const formattedKm = km / 1000;
    return `${formattedKm.toFixed(3)}`;
  } else {
    return km.toFixed(2);
  }
}
