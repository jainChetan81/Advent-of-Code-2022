import { readFileSync } from "fs";

const input: string[] = readFileSync("fourth.txt", "utf8").split("\n");
let totalOverlaps = 0,
	letOverlapAtAll = 0;
for (let i = 0; i < input.length; i++) {
	const element = input[i];
	const [firstElf, secondElf] = [element.split(",")[0].split("-"), element.split(",")[1].split("-")];
	const isThereCompleteOverlap = findCompleteOverlapping(firstElf, secondElf);
	totalOverlaps += isThereCompleteOverlap ? 1 : 0;
	const isThereAnyOverlap = findSomeOverlapAtAll(firstElf, secondElf);
	letOverlapAtAll += isThereAnyOverlap ? 1 : 0;
}
console.log(totalOverlaps);
console.log(letOverlapAtAll);

function findSomeOverlapAtAll(first: string[], second: string[]): boolean {
	const [r1, r2] = [+first[0], +first[1]];
	const [r3, r4] = [+second[0], +second[1]];

	if (r3 >= r1 && r3 <= r2) {
		return true;
	}
	if (r4 >= r1 && r4 <= r2) {
		return true;
	}
	if (r1 >= r3 && r1 <= r4) {
		return true;
	}
	if (r2 >= r3 && r2 <= r4) {
		return true;
	}
	return false;
}

function findCompleteOverlapping(first: string[], second: string[]): boolean {
	const [r1, r2] = [+first[0], +first[1]];
	const [r3, r4] = [+second[0], +second[1]];
	if (r3 >= r1 && r3 <= r2 && r4 >= r1 && r4 <= r2) {
		return true;
	}
	if (r1 >= r3 && r1 <= r4 && r2 >= r3 && r2 <= r4) {
		return true;
	}
	return false;
}
