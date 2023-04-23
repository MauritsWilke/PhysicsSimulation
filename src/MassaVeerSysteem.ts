import { kg, m, m2, m_s, veerconstante, constante } from "./types";
import { Fhooke, Flw, Fzw, MeanDiameter, SpringIndex, Veerconstante } from "./formules.js";

export class MassaVeerSysteem {
	public uitrekking: m;
	public snelheid: m_s;
	public hoogte: m;
	public blokjesOppervlakte: m2;
	public veerConstante: veerconstante;

	constructor(
		public blokjeMassa: kg,
		public blokjeGrootte: m,
		public veerMassa: kg,
		public veerLengte: m,
		public initHoogte: m,
		public massaHieronder: kg,
		public index: number,
		constante: constante
	) {
		this.uitrekking = 0 as m;
		this.snelheid = 0 as m_s;
		this.hoogte = initHoogte;
		this.blokjesOppervlakte = blokjeGrootte * blokjeGrootte as m2;

		const meanDiameter = MeanDiameter(constante.veer.DO, constante.veer.DI);
		const springIndex = SpringIndex(meanDiameter, constante.veer.DO);
		this.veerConstante = Veerconstante(constante.veer.DO, constante.veer.sheerModulusOfElasticity, springIndex, constante.veer.Na(this.veerLengte));
	}

	updateWaarden = (constante: constante) => {
		const luchtweerstand = Flw(constante.luchtdichtheid, this.blokjesOppervlakte, constante.wrijvingsconstante, this.snelheid);
		const versnelling = (Fzw(this.massaHieronder) + Fhooke(this.veerConstante, this.uitrekking) + luchtweerstand) / this.massaHieronder;
		this.snelheid = this.snelheid + versnelling * constante.dt as m_s;
		this.hoogte = this.hoogte + this.snelheid * constante.dt as m;
		this.uitrekking = this.initHoogte - this.hoogte as m;
	}
}