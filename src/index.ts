/**
 * Natuurkunde simulatie - Massa veersystemen
 * Maurits Wilke
 */

import { appendFileSync } from "fs";
import { MassaVeerSysteem } from "./MassaVeerSysteem.js";
import { Nmm2, constante, kg, kgmm3, m, mm, s, veerconstante, wrijvingsconstante, ρ } from "./types.js";
import { MeanDiameter, Veermassa } from "./formules.js";

// 65 is de maximale load van de veer
const hoeveelheidSystemen = 65;
const systemen: MassaVeerSysteem[] = new Array(hoeveelheidSystemen);

const constante: constante = {
	luchtdichtheid: 1.293 as ρ,
	wrijvingsconstante: 1.05 as wrijvingsconstante,
	dt: 0.01 as s,
	veer: {
		sheerModulusOfElasticity: 69 * Math.pow(10, 3) as Nmm2,
		Na: (veerlengte: m) => Math.floor(veerlengte / 86.741 * 6),
		DO: 30.556 as mm,
		DI: 26.238 as mm,
		NT: (veerlengte: m) => veerlengte / 86.471 * 8,
		dichtheid: 0.00000793 as kgmm3
	}
}


// # INITIATIE LOOP
let blokjeGrootte = 0.01 as m;
let blokjeMassa = 0.002702 as kg;
let veerBeginLengte = 0.1 as m;
let veerBeginMassa = 0.1 as kg;
let veerBeginConstante = 20 as veerconstante;

let initHoogte = 0 as m;
let massaHieronder = blokjeMassa + veerBeginMassa as kg;

// Van onder naar boven
for (let i = 0; i < hoeveelheidSystemen; i++) {
	const meanDiameter = MeanDiameter(constante.veer.DO, constante.veer.DI);
	const veermassa = Veermassa(constante.veer.dichtheid, constante.veer.NT(veerBeginLengte), constante.veer.DI, meanDiameter);
	const massaVeerEnHieronder = massaHieronder + veermassa as kg;

	systemen[i] = new MassaVeerSysteem(
		blokjeMassa,
		blokjeGrootte,
		veermassa,
		veerBeginLengte,
		initHoogte,
		massaVeerEnHieronder,
		i,
		constante
	)

	initHoogte = initHoogte + blokjeGrootte + veerBeginLengte as m;
	massaHieronder = massaHieronder + blokjeMassa + veermassa as kg;

	veerBeginLengte = veerBeginLengte + 0.1 as m;
	veerBeginConstante = veerBeginConstante + 10 as veerconstante;
}

console.log(systemen[systemen.length - 1].massaHieronder);

// # Loop
const tijd = 100 as s;

for (let t = 0; t < tijd; t += constante.dt) {
	systemen.forEach(systeem => systeem.updateWaarden(constante));
	let alleHoogtes = 0;
	systemen.forEach(v => alleHoogtes += v.hoogte);

	appendFileSync("./data", String(alleHoogtes) + "\n")
}