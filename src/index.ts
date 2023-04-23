/**
 * Natuurkunde simulatie - Massa veersystemen
 * Maurits Wilke
 */

import { appendFileSync } from "fs";
import { MassaVeerSysteem } from "./MassaVeerSysteem.js";
import { Nmm2, constante, kg, m, mm, s, veerconstante, wrijvingsconstante, ρ } from "./types.js";

const hoeveelheidSystemen = 30;
const systemen: MassaVeerSysteem[] = new Array(hoeveelheidSystemen);

const constante: constante = {
	luchtdichtheid: 1.293 as ρ,
	wrijvingsconstante: 1.05 as wrijvingsconstante,
	dt: 0.01 as s,
	veer: {
		sheerModulusOfElasticity: 69 * Math.pow(10, 3) as Nmm2,
		Na: (veerlengte: m) => Math.floor(veerlengte / 86.741 * 6),
		DO: 30.556 as mm,
		DI: 26.238 as mm
	}
}


// # INITIATIE LOOP
let blokjeBeginMassa = 2.702 as kg;
let blokjeGrootte = 0.10 as m;
let veerBeginMassa = 0.1 as kg;
let veerBeginLengte = 0.1 as m;
let veerBeginConstante = 20 as veerconstante;

let initHoogte = 0 as m;
let massaHieronder = blokjeBeginMassa + veerBeginMassa as kg;

// Van onder naar boven
for (let i = 0; i < hoeveelheidSystemen; i++) {
	systemen[i] = new MassaVeerSysteem(
		blokjeBeginMassa,
		blokjeGrootte,
		veerBeginMassa,
		veerBeginLengte,
		veerBeginConstante,
		initHoogte,
		massaHieronder,
		i,
		constante
	)

	initHoogte = initHoogte + blokjeGrootte + veerBeginLengte as m;
	massaHieronder = massaHieronder + blokjeBeginMassa + veerBeginMassa as kg;

	blokjeBeginMassa = blokjeBeginMassa + 0.1 as kg;
	veerBeginMassa = veerBeginMassa + 0.1 as kg;
	veerBeginLengte = veerBeginLengte + 0.1 as m;
	veerBeginConstante = veerBeginConstante + 10 as veerconstante;
}

// # Loop
const tijd = 100 as s;

for (let t = 0; t < tijd; t += constante.dt) {
	systemen.forEach(systeem => systeem.updateWaarden(constante));
	let alleHoogtes = 0;
	systemen.forEach(v => alleHoogtes += v.hoogte);

	appendFileSync("./data", String(alleHoogtes) + "\n")
}