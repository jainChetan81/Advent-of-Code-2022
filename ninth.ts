import { readFileSync } from "fs";
const input: string[] = readFileSync("ninth-test.txt", "utf8").split("\n");
// const input: string[] = readFileSync("ninth.txt", "utf8").split("\n");

for (let i = 0; i < input.length; i++) {
	const [direction, position] = input[i].split(" ");
}
