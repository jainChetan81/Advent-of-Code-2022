import { readFileSync } from "fs";
// export const a = "";
// const input: string[] = await Deno.readTextFile("tenth-test.txt").then((e: string) => e.split("\n")); //14820 too high
const input: string[] = readFileSync("tenth.txt", "utf8").split("\n");
const signalStrength = new Map<number, number>();
let currentStrength = 1;
let cycle = 1;
for (let i = 0; i < input.length; i++) {
	const [command, value] = input[i]!.split(" ") as ["noop" | "addx", undefined | `${number}`];
	updateSignal(command, value);
}

function updateSignal(command: "noop" | "addx", value: undefined | `${number}`) {
	// if command is noop, don't change the signal strength
	// if command is addx, add the value to the signal strength on the second cycle, on first do nothing
	console.log("STARTED---------------------------------------");
	console.log("command", command, "value", value);
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
		console.log("cycle", cycle, "signal", currentStrength);
	}
}
console.log("signalStrength", signalStrength);
console.log("findSumAll()", findSumAll(signalStrength));

function findSumAll(signalStrength: Map<number, number>, signals = [20, 60, 100, 140, 180, 220]) {
	let sum = 0;
	for (const signal of signals) {
		const cycle = signalStrength.get(signal);
		if (!cycle) continue;
		sum += cycle * signal;
	}
	return sum;
}
