import { kg, m, m2, ms, veerconstante, constante } from "./types";
import { Fhooke, Flw, Fzw } from "./formules.js";

export class MassaVeerSysteem {
	public uitrekking: m;
	public snelheid: ms;
	public hoogte: m;
	public blokjesOppervlakte: m2;

	constructor(
		public blokjeMassa: kg,
		public blokjeGrootte: m,
		public veerMassa: kg,
		public veerLengte: m,
		public veerConstante: veerconstante,
		public initHoogte: m,
		public massaHieronder: kg,
		public index: number
	) {
		this.uitrekking = 0 as m;
		this.snelheid = 0 as ms;
		this.hoogte = initHoogte;
		this.blokjesOppervlakte = blokjeGrootte * blokjeGrootte as m2;
	}

	updateWaarden = (constante: constante) => {
		const luchtweerstand = Flw(constante.luchtdichtheid, this.blokjesOppervlakte, constante.wrijvingsconstante, this.snelheid);
		const versnelling = (Fzw(this.massaHieronder) + Fhooke(this.veerConstante, this.uitrekking) + luchtweerstand) / this.massaHieronder;
		this.snelheid = this.snelheid + versnelling * constante.dt as ms;
		this.hoogte = this.hoogte + this.snelheid * constante.dt as m;
		this.uitrekking = this.initHoogte - this.hoogte as m;
	}
}