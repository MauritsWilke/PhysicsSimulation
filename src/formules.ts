import { kg, m, m2, ms, s, veerconstante, ρ, wrijvingsconstante } from "./types";

export const Fhooke = (C: veerconstante, uitrekking: m) => C * uitrekking; // Positief, omdat de kracht geleverd wordt door de veer.
export const Fzw = (massa: kg, g = 9.81) => (massa * g) * -1; // Keer -1, omdat het altijd tegenwerkt.
export const Flw = (luchtdichtheid: ρ, oppervlakte: m2, wrijving: wrijvingsconstante, v: ms) => -0.5 * luchtdichtheid * oppervlakte * wrijving * Math.pow(v, 2);