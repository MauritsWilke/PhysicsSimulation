/**
 * Natuurkunde simulatie - Massa veersystemen
 * Maurits Wilke
 */

import { appendFileSync } from "fs";
import { MassaVeerSysteem } from "./MassaVeerSysteem.js";
import { N_mm2, constante, kg, kg_mm3, m, mm, s, wrijvingsconstante, ρ } from "./types.js";
import { MeanDiameter, Veermassa } from "./formules.js";

// 65 is de maximale load van de veer
const hoeveelheidSystemen = 10000;
const systemen: MassaVeerSysteem[] = new Array(hoeveelheidSystemen);

const constante: constante = {
	luchtdichtheid: 1.293 as ρ,
	wrijvingsconstante: 1.05 as wrijvingsconstante,
	dt: 0.1 as s,
	veer: {
		sheerModulusOfElasticity: 77.2 as N_mm2,
		Na: (veerlengte: m) => Math.floor(veerlengte / 0.086741 * 6),
		DO: 30.556 as mm,
		DI: 26.238 as mm,
		NT: (veerlengte: m) => veerlengte / 0.086741 * 8,
		dichtheid: 0.00000793 as kg_mm3
	}
}


// # INITIATIE LOOP
let blokjeGrootte = 0.10 as m;
let blokjeMassa = 2.702 as kg;
let veerBeginLengte = 0.1 as m;

let initHoogte = 0 as m;
let massaHieronder = blokjeMassa as kg;

// Van onder naar boven
for (let i = 0; i < hoeveelheidSystemen; i++) {
	const meanDiameter = MeanDiameter(constante.veer.DO, constante.veer.DI);
	const veermassa = Veermassa(constante.veer.dichtheid, constante.veer.NT(veerBeginLengte), constante.veer.DI, meanDiameter);
	const massaVeerenHieronder = massaHieronder + blokjeMassa + veermassa as kg;

	systemen[i] = new MassaVeerSysteem(
		blokjeMassa,
		blokjeGrootte,
		veermassa,
		veerBeginLengte,
		initHoogte,
		massaVeerenHieronder,
		i,
		constante
	)

	initHoogte = initHoogte + blokjeGrootte + veerBeginLengte as m;
	veerBeginLengte = veerBeginLengte + 0.1 as m;
}


// # Loop
const tijd = 1000 as s;

for (let t = 0; t < tijd; t += constante.dt) {
	systemen.forEach(systeem => systeem.updateWaarden(constante));
	let alleHoogtes = 0;
	systemen.forEach(v => alleHoogtes += v.hoogte);

	appendFileSync("./data", String(alleHoogtes) + "\n");
}