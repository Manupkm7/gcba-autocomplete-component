const nombresAvenidasBase = [
  "9 de Julio",
  "Rivadavia",
  "Corrientes",
  "Santa Fe",
  "Córdoba",
  "del Libertador",
  "de Mayo",
  "Pueyrredón",
  "Callao",
  "San Juan",
  "Belgrano",
  "Independencia",
  "Entre Ríos",
  "Leandro N. Alem",
  "Juan B. Justo",
  "Scalabrini Ortiz",
  "Federico Lacroze",
  "Alvear",
  "Las Heras",
  "General Paz",
];

export const normalizarComoAvenida = (calle: string): string => {
  const match = nombresAvenidasBase.find((nombre) =>
    calle.toLowerCase().includes(nombre.toLowerCase())
  );
  return match ? `${capitalizar(match)} Av.` : capitalizar(calle);
};

const capitalizar = (str: string): string =>
  str
    .toLowerCase()
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
