// import { readFileSync } from "fs";
export const a = "";
// @ts-expect-error Deno not found
const input: string[] = await Deno.readTextFile("tenth.txt").then((e: string) => e.split("\n"));
// const input: string[] = readFileSync("ninth.txt", "utf8").split("\n");

for (let i = 0; i < input.length; i++) {
	const [command, value] = input[i]!.split(" ") as ["noop" | "addx", undefined | `${number}`];
	console.log(command, value);
}
