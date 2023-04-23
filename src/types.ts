type Brand<K, T> = K & { __brand: T };

export type m = Brand<number, "meter">;
export type s = Brand<number, "seconde">;
export type kg = Brand<number, "kilogram">;

export type ms = Brand<number, "m/s">;

export type m2 = Brand<number, "meter^2">;
export type ms2 = Brand<number, "m/s^2">;

export type veerconstante = Brand<number, "veerconstante">;
export type wrijvingsconstante = Brand<number, "wrijvingsconstante">;
export type ρ = Brand<number, "kg/m^3">;

export interface constante {
	luchtdichtheid: ρ,
	wrijvingsconstante: wrijvingsconstante,
	dt: s
}