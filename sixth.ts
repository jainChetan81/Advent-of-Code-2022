// import { readFileSync } from "fs";
// const input: string = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
export const a = "";
// @ts-expect-error Deno not found
const input = await Deno.readTextFile("sixth.txt");
console.log("firstFourUniqueDigits()", firstFourUniqueDigits());
// find the first four unique digits in the string and the last index

function firstFourUniqueDigits(): number {
	const uniqueMap = new Map<string, number>();
	for (let i = 0; i < input.length; i++) {
		const element = input[i];
		if (!uniqueMap.has(element)) {
			uniqueMap.set(element, i);
			if (uniqueMap.size === 14) {
				return i + 1;
			}
		} else {
			i = uniqueMap.get(element)!;
			uniqueMap.clear();
		}
		console.log("i:", i + 1, "element:", element, "size:", uniqueMap.size);
		console.log("uniqueMap:", uniqueMap);
	}
	return 0;
}
