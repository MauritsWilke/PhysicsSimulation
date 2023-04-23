import { kg, m, m2, ms, s, veerconstante, ρ, wrijvingsconstante, mm, N, Nmm2 } from "./types";

export const Fhooke = (C: veerconstante, uitrekking: m) => C * uitrekking as N; // Positief, omdat de kracht geleverd wordt door de veer.
export const Fzw = (massa: kg, g = 9.81) => (massa * g) * -1 as N; // Keer -1, omdat het altijd tegenwerkt.
export const Flw = (luchtdichtheid: ρ, oppervlakte: m2, wrijving: wrijvingsconstante, v: ms) => -0.5 * luchtdichtheid * oppervlakte * wrijving * Math.pow(v, 2) as N;

export const Diameter = (DO: mm, diameter: mm) => (DO - diameter) / 2 as mm;
export const MeanDiameter = (DO: mm, diameter: mm) => (DO + diameter) / 2 as mm;
export const SpringIndex = (meanDiameter: mm, diameter: mm) => meanDiameter / diameter;
export const Veerconstante = (diameter: mm, sheerModulusOfElasticity: Nmm2, springIndex: number, Na: number) => (diameter * sheerModulusOfElasticity) / 8 * Math.pow(springIndex, 3) * Na as veerconstante;