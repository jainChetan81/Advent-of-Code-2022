// import { readFileSync } from "fs";
// const input: string[] = readFileSync("tenth.txt", "utf8").split("\n");
export const a = "";
// @ts-expect-error deno not found
const input: string[] = await Deno.readTextFile("tenth.txt").then((e: string) => e.split("\n"));
const signalStrength = new Map<number, number>();
let currentStrength = 1;
let cycle = 1;
for (let i = 0; i < input.length; i++) {
	const [command, value] = input[i]!.split(" ") as ["noop" | "addx", undefined | `${number}`];
	updateSignal(command, value);
}
// console.log("signalStrength", signalStrength);
console.log("findSumAll()", findSumAll(signalStrength));

function updateSignal(command: "noop" | "addx", value: undefined | `${number}`) {
	// if command is noop, don't change the signal strength
	// if command is addx, add the value to the signal strength on the second cycle, on first do nothing
	for (let i = 0; i < (command === "noop" ? 1 : 2); i++) {
		// for the first loop in either case do nothing
		cycle++;
		if (i === 0) {
			signalStrength.set(cycle, currentStrength);
			continue;
		}
		// in the second loop , which is only valid for addx
		// add the value to the signal strength and then increase the cycle to set the new signal strength
		if (!value) continue;
		currentStrength += +value;
		signalStrength.set(cycle, currentStrength);
	}
}

function findSumAll(signalStrength: Map<number, number>, signals = [20, 60, 100, 140, 180, 220]) {
	let sum = 0;
	for (const signal of signals) {
		const cycle = signalStrength.get(signal);
		if (!cycle) continue;
		sum += cycle * signal;
	}
	return sum;
}
let crtCycle = 0;
let crtSpritePosition = 0; //>=0 && <=40
const positions = new Map<number, ("#" | ".")[]>();
let crtRow = 0;
const CRT_LENGTH = 2;
for (let i = 0; i < input.length; i++) {
	const [command, value] = input[i]!.split(" ") as ["noop" | "addx", undefined | `${number}`];
	console.log("command: ", command, "value: ", value);
	updatePixels(command, value);
}

function updatePixels(command: "noop" | "addx", value: undefined | `${number}`) {
	// if command is noop, don't update CRT Cycle, draw one pixel
	// if command is addx,on first cycle, don't update CRT Cycle, draw one pixel and on second cycle, draw a pixel and then update the CRT position by the value
	for (let i = 0; i < (command === "noop" ? 1 : 2); i++) {
		// for the first loop in either case do nothing
		if (i === 0) {
			addPixelToSprite();
			crtCycle++;
			continue;
		}
		if (!value) continue;
		addPixelToSprite();
		crtCycle++;
		crtSpritePosition += +value;
	}
}

function addPixelToSprite() {
	// if the crtCycle is in  between the crtSpritePosition and crtSpritePosition + 2, add "#" otherwise add "."
	if (crtCycle >= 40) {
		crtCycle = 0;
		crtRow++;
	}
	const currentRowPosition = positions.get(crtRow) ?? [];
	if (crtCycle >= crtSpritePosition && crtCycle <= crtSpritePosition + CRT_LENGTH) {
		currentRowPosition[crtCycle] = "#";
	} else {
		currentRowPosition[crtCycle] = ".";
	}
	positions.set(crtRow, currentRowPosition);
}
console.log("positions", positions.get(0)?.join(""));
console.log("positions", positions.get(1)?.join(""));
console.log("positions", positions.get(2)?.join(""));
console.log("positions", positions.get(3)?.join(""));
console.log("positions", positions.get(4)?.join(""));
console.log("positions", positions.get(5)?.join(""));
