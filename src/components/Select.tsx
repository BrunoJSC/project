type AccessoriesCar =
  | "Air bag"
  | "Alarme"
  | "Ar condicionado"
  | "Central multimídia"
  | "Câmbio automático"
  | "Câmbio manual"
  | "Direção hidráulica"
  | "Direção elétrica"
  | "Freios ABS"
  | "Freios de dianteiro";

export interface InputProps {
  label: string;
  type: "text";
  placeholder: string;
}

export interface SelectProps extends InputProps {
  options: {
    value: string;
    label: string;
  }[];
}

export interface ReactSelectProps extends SelectProps {
  isMulti: boolean;
}

export function Select() {}
