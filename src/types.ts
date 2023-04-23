type Brand<K, T> = K & { __brand: T };

export type m = Brand<number, "meter">;
export type s = Brand<number, "seconde">;
export type N = Brand<number, "newton">;
export type kg = Brand<number, "kilogram">;
export type mm = Brand<number, "millimeter">;

export type m_s = Brand<number, "m/s">;
export type N_mm2 = Brand<number, "newton/mm^2">;

export type m2 = Brand<number, "meter^2">;
export type m_s2 = Brand<number, "m/s^2">;
export type kg_mm3 = Brand<number, "kg/mm^3">;
export type mm2 = Brand<number, "mm^2">;

export type veerconstante = Brand<number, "N/mm">;
export type wrijvingsconstante = Brand<number, "wrijvingsconstante">;
export type ρ = Brand<number, "kg/m^3">;

export interface constante {
	luchtdichtheid: ρ,
	wrijvingsconstante: wrijvingsconstante,
	dt: s,
	veer: {
		sheerModulusOfElasticity: N_mm2,
		Na: (veerlengte: m) => number,
		DO: mm,
		DI: mm,
		NT: (veerlengte: m) => number,
		dichtheid: kg_mm3
	}
}